const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { User } = require('../models')

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

module.exports = { userExtractor, tokenExtractor, adminExtractor, errorHandler }
