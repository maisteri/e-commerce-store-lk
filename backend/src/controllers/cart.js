const router = require('express').Router()
const { cartExtractor } = require('../utils/middleware')
const { ShoppingCart, ShoppingCartItem, Product } = require('../models')

const productDetailsIncluded = {
  model: Product,
  attributes: ['title', 'price', 'imageUrl'],
}

const shoppingCartDetailsIncluded = {
  attributes: { exclude: ['shoppingCartId'] },
  model: ShoppingCartItem,
  include: productDetailsIncluded,
}

router.get('/', cartExtractor, async (req, res) => {
  const id = req.shoppingCartId
  const cart = await ShoppingCart.findByPk(id, {
    include: shoppingCartDetailsIncluded,
  })
  res.status(200).json(cart.shoppingCartItems)
})

// add items to shopping cart
router.post('/', cartExtractor, async (req, res) => {
  const shoppingCartId = req.shoppingCartId
  const productId = req.body.id

  if (!productId) {
    return res.status(400).json({ error: 'Product id must be provided' })
  }

  const product = await Product.findByPk(productId)

  if (!product) {
    return res.status(404).json({ error: 'No such product' })
  }

  const cart = await ShoppingCart.findByPk(shoppingCartId, {
    include: shoppingCartDetailsIncluded,
  })

  // if item exists in shopping cart, add +1 to quantity of that item
  const existingItem = cart.shoppingCartItems.find(
    (item) => item.productId === productId
  )
  if (existingItem) {
    existingItem.quantity = existingItem.quantity + 1
    const updatedProduct = await existingItem.save()
    return res.status(200).json(updatedProduct)
  }

  const newItem = await ShoppingCartItem.create({
    quantity: 1,
    shoppingCartId,
    productId: product.id,
  })

  const newItemWithDetails = await ShoppingCartItem.findByPk(newItem.id, {
    attributes: { exclude: ['shoppingCartId'] },
    include: productDetailsIncluded,
  })

  console.log(JSON.stringify(newItemWithDetails, null, 2))

  res.status(201).json(newItemWithDetails)
})

// modify a single shopping cart item quantity

// TODO: if itemId in Shoppingcart...
router.put('/:id', cartExtractor, async (req, res) => {
  const shoppingCartItemId = req.params.id
  const item = await ShoppingCartItem.findByPk(shoppingCartItemId, {
    attributes: { exclude: ['shoppingCartId'] },
    include: productDetailsIncluded,
  })

  if (!item) {
    return res.status(404).json({ error: 'No item with given id' })
  }

  if (!req.body.quantity) {
    res.status(400).json({ error: 'Quantity must be specified' })
  }

  item.quantity = req.body.quantity
  const modifiedItem = await item.save()
  res.status(200).json(modifiedItem)
})

router.delete('/', cartExtractor, async (req, res) => {
  const shoppingCartId = req.shoppingCartId
  const cart = await ShoppingCart.findByPk(shoppingCartId)
  const cartItems = await ShoppingCartItem.findAll({
    where: {
      shoppingCartId,
    },
  })
  await cart.destroy()
  cartItems.forEach((item) => item.destroy())
  res.status(204).end()
})

module.exports = router
