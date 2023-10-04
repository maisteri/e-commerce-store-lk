const router = require('express').Router()
const { User } = require('../models')
const { adminExtractor, userExtractor } = require('../util/middleware')

router.get('/', adminExtractor, async (req, res) => {
  const users = await User.findAll()

  return res.status(200).json(users)
})

router.put('/:id', userExtractor, async (req, res) => {
  const userId = req.params.id
  if (userId !== req.user.id) {
    res.status(403)
  }
  const user = User.findByPk(userId)
  user.name = req.body.name
  await user.save()
  res.status(200).end()
})

module.exports = router
