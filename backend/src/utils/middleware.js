const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { User, ShoppingCart } = require('../models')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send(error)
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(400).send(error)
  }

  if (error.name === 'SequelizeValidationError') {
    return response
      .status(400)
      .send({ error: error.errors.map((e) => e.message) })
  }

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

const userExtractor = (req, res, next) => {
  const token = req.token
  if (!token) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const decodedToken = jwt.verify(token, SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  req.user = decodedToken.id
  next()
}

const isCartCreator = async (req, res, next) => {
  const sessionId = req.session.id
  const shoppingCartId = req.params.id
  const cart = await ShoppingCart.findByPk(shoppingCartId)
  if (!cart) {
    return res.status(400).json({ error: 'No such cart' })
  }
  if (cart.sessionId !== sessionId) {
    return res.status(400).json({ error: 'Wrong session' })
  }
  next()
}

const tokenExtractor = (req, res, next) => {
  const authHeader = req.get('authorization')
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    req.token = authHeader.substring(7)
  }
  next()
}

const adminExtractor = async (req, res, next) => {
  const user = await User.findByPk(req.user)
  if (!user.admin) {
    return res.status(403).json({ error: 'Resource restricted to admin users' })
  }
  req.admin = true
  next()
}

module.exports = {
  isCartCreator,
  userExtractor,
  tokenExtractor,
  adminExtractor,
  errorHandler,
}
