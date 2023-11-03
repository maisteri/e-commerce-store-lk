const router = require('express').Router()
const { cartExtractor } = require('../utils/middleware')
const { ShoppingCart, ShoppingCartItem, Product } = require('../models')

router.get('/', cartExtractor, async (req, res) => {
  const id = req.shoppingCartId
  const cart = await ShoppingCart.findOne({
    attributes: { exclude: ['shoppingCartId', 'sessionId', 'current'] },
    include: {
      attributes: { exclude: ['shoppingCartId'] },
      model: ShoppingCartItem,
      include: {
        model: Product,
        attributes: ['title', 'price', 'imageUrl'],
      },
    },
    where: { id },
  })
  res.status(200).json(cart)
})

// create a new shopping cart
router.post('/', async (req, res) => {
  const sessionId = req.session.id
  const { id } = await ShoppingCart.create({ current: true, sessionId })
  res.status(201).json({ id })
})

// add items to existing shopping cart
router.post('/:id', cartExtractor, async (req, res) => {
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
    include: {
      model: ShoppingCartItem,
    },
  })

  const p = cart.shoppingCartItems.find((item) => item.productId === productId)
  if (p) {
    p.quantity = p.quantity + 1
    const updatedProduct = await p.save()
    return res.status(200).json(updatedProduct)
  }

  const item = await ShoppingCartItem.create({
    quantity: 1,
    shoppingCartId,
    productId: product.id,
  })
  res.status(201).json(item)
})

// modify a single shopping cart item quantity
router.put('/:id', cartExtractor, async (req, res) => {
  const shoppingCartItemId = req.params.id
  const item = await ShoppingCartItem.findByPk(shoppingCartItemId)

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
  cart.destroy()
  cartItems.forEach((item) => item.destroy())
  res.status(204).end()
})

module.exports = router
