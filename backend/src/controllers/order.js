const router = require('express').Router()
const {
  Order,
  ShoppingCart,
  ShoppingCartItem,
  Address,
  User,
  Product,
} = require('../models')
const {
  cartExtractor,
  userMaybeExtractor,
  userExtractor,
  adminExtractor,
} = require('../utils/middleware')

// Create a new order
router.post('/', cartExtractor, userMaybeExtractor, async (req, res) => {
  const cart = await ShoppingCart.findByPk(req.shoppingCartId, {
    include: ShoppingCartItem,
  })

  if (cart.shoppingCartItems.length === 0) {
    return res.status(400).json({ error: 'Shoppingcart is empty' })
  }

  let newOrder = req.body
  newOrder = { ...req.body, shoppingCartId: req.shoppingCartId }
  if (req.user) {
    newOrder = { ...newOrder, userId: req.user }
  }
  const order = await Order.create(newOrder)

  // ShoppingCart status current is changed to false.
  // This means cart is ordered, and new cart should be used
  cart.current = false
  cart.save()

  res.json(order)
})

// Get all orders
router.get('/', userExtractor, adminExtractor, async (req, res) => {
  const orders = await Order.findAll({
    include: [
      {
        model: Address,
      },
      {
        model: User,
      },
      {
        model: ShoppingCart,
        include: {
          model: ShoppingCartItem,
          include: Product,
        },
      },
    ],
  })
  res.json(orders)
})

// Update an order
router.put('/:id', async (req, res) => {
  const order = await Order.findByPk(req.params.id)
  if (order) {
    await order.update(req.body)
    res.json(order)
  } else {
    res.status(404).json({ error: 'Order not found' })
  }
})

// Delete an order
router.delete('/:id', adminExtractor, async (req, res) => {
  const order = await Order.findByPk(req.params.id)
  if (order) {
    await order.destroy()
    res.json({ message: 'Order deleted' })
  } else {
    res.status(404).json({ error: 'Order not found' })
  }
})

module.exports = router
