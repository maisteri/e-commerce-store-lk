const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const { User } = require('../models')
const { adminExtractor, userExtractor } = require('../utils/middleware')

router.get('/', userExtractor, adminExtractor, async (req, res) => {
  const users = await User.findAll()
  const returnedUsers = users.map((user) => {
    const u = user.toJSON()
    delete u.passwordHash
    return u
  })

  return res.status(200).json(returnedUsers)
})

router.post('/', async (req, res) => {
  if (
    !('username' in req.body) ||
    !('password' in req.body) ||
    !('name' in req.body)
  ) {
    return res.status(400).json({ error: 'Mandatory parameters missing.' })
  }

  const { username, name, password } = req.body

  const usernameAlreadyInUse = await User.findOne({ where: { username } })
  if (usernameAlreadyInUse) {
    return res.status(400).json({ error: 'Username exists.' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = {
    username,
    name,
    passwordHash,
  }

  const savedUser = await User.create(user)

  const payload = {
    id: savedUser.id,
  }

  const token = jwt.sign(payload, SECRET, { expiresIn: '30 days' })
  res.status(201).json({ token, name: user.name })
})

router.put('/:id', userExtractor, async (req, res) => {
  const userId = req.params.id
  if (userId !== req.user.id) {
    return res.status(403)
  }
  const user = await User.findByPk(userId)
  user.name = req.body.name
  await user.save()
  res.status(200).end()
})

module.exports = router
