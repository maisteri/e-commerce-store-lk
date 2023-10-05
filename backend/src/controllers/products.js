const router = require('express').Router()
const { adminExtractor, userExtractor } = require('../util/middleware')
const { Product } = require('../models')

router.get('/', async (req, res) => {
  const products = await Product.findAll({})
  res.status(200).json(products)
})

router.post('/', userExtractor, adminExtractor, async (req, res) => {
  if (Array.isArray(req.body)) {
    for (const product of req.body) {
      await Product.create(product)
    }
    return res.status(204).end()
  }
  const newProduct = await Product.create(req.body)
  res.status(201).json(newProduct)
})

router.put('/:id', async (req, res) => {
  const productId = req.params.id
  const changes = req.body
  const product = await Product.findByPk(productId)
  if (!product) {
    return res.status(404).json({ error: 'No product with given id' })
  }
  const newProduct = await Product.update(changes, { where: { id: productId } })
  res.status(200).json(newProduct)
})

router.delete('/:id', async (req, res) => {
  const productId = req.params.id
  const product = await Product.findByPk(productId)
  if (!product) {
    return res.status(404).json({ error: 'No product with given id' })
  }

  product.destroy()
  res.status(204).end()

  return null
})

module.exports = router
