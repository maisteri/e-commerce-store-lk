/* To be added:
 * - using proper SECRET
 * - what is included into token?
 * - token expire into configuration
 */

const { User } = require('../models')
const bcrypt = require('bcrypt')
const { SECRET } = require('../utils/config')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ where: { username } })

  if (!user) {
    return res.status(404).json({ error: 'No such username' })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect) {
    return res.status(403).json({ error: 'Wrong password' })
  }

  const payload = {
    id: user.id,
  }

  const token = jwt.sign(payload, SECRET, { expiresIn: '30 days' })
  res.status(200).json({ token, name: user.name })
})

module.exports = router
