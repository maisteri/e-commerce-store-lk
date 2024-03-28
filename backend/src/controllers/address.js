const router = require('express').Router()
const {
  adminExtractor,
  userExtractor,
  userMaybeExtractor,
} = require('../utils/middleware')
const { Address } = require('../models')

// Get all addresses
router.get('/', userExtractor, adminExtractor, async (req, res) => {
  const addresses = await Address.findAll()
  res.json(addresses)
})

// Save an address
router.post('/', userMaybeExtractor, async (req, res) => {
  const userId = req.user
  let newAddress = req.body
  if (userId) {
    newAddress = { ...newAddress, userId: userId }
  }
  const address = await Address.create(newAddress)
  res.status(201).json(address)
})

// Modify an address
// User should be the owner of the address
router.put('/:id', userExtractor, async (req, res) => {
  await Address.update(req.body, {
    where: { id: req.params.id },
  })
  const updatedAddress = await Address.findByPk(req.params.id)
  res.json(updatedAddress)
})

// Delete an address
router.delete('/:id', userExtractor, adminExtractor, async (req, res) => {
  await Address.destroy({
    where: { id: req.params.id },
  })
  res.json({ message: 'Address deleted successfully.' })
})

module.exports = router
