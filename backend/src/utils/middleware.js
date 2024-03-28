const jwt = require('jsonwebtoken')
const { SECRET, NODE_ENV } = require('./config')
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

const userMaybeExtractor = (req, res, next) => {
  const token = req.token
  if (token) {
    const decodedToken = jwt.verify(token, SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    req.user = decodedToken.id
  }

  next()
}

const cartExtractor = async (req, res, next) => {
  const sessionId = req.session.id
  const cart = await ShoppingCart.findOne({
    where: { sessionId, current: true },
  })
  console.log(JSON.stringify(cart))
  if (!cart) {
    const { id } = await ShoppingCart.create({ current: true, sessionId })
    req.shoppingCartId = id
    return next()
  }
  req.shoppingCartId = cart.id
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

const corsDevRules = (req, res, next) => {
  if (NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }
  next()
}

module.exports = {
  cartExtractor,
  userExtractor,
  userMaybeExtractor,
  tokenExtractor,
  adminExtractor,
  errorHandler,
  corsDevRules,
}
