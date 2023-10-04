const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { User } = require('../models')

const userExtractor = (req, res, next) => {
  const token = req.token
  const decodedToken = jwt.verify(token, SECRET)
  if (!token || !decodedToken.id) {
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
    res.status(403).json({ error: 'Resource restricted to admin users' })
  }
  req.admin = true
  next()
}

module.exports = { userExtractor, tokenExtractor, adminExtractor }
