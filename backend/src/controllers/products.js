const router = require('express').Router()
const { adminExtractor, userExtractor } = require('../utils/middleware')
const { Product, Rating } = require('../models')
const { Op, Sequelize } = require('sequelize')

async function calculateAverageRating(productId) {
  const result = await Rating.findAll({
    where: { productId },
    attributes: [
      [Sequelize.fn('AVG', Sequelize.col('value')), 'averageRating'],
    ],
    raw: true,
  })
  if (result.length > 0) {
    const averageRating = result[0].averageRating
    return averageRating
  } else {
    return null
  }
}

async function calculateHowManyRatings(productId) {
  const result = await Rating.findAll({
    where: { productId },
  })
  if (result.length > 0) {
    return result.length
  } else {
    return null
  }
}

router.get('/categories', async (req, res) => {
  const products = await Product.findAll()
  const categories = Array.from(new Set(products.map((p) => p.category)))
  res.status(200).json(categories)
})

router.get('/', async (req, res) => {
  let where = {}
  const filter = req.query.search
  const category = req.query.category

  if (filter) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${filter}%`,
          },
        },
        {
          category: {
            [Op.iLike]: `%${filter}%`,
          },
        },
        {
          description: {
            [Op.iLike]: `%${filter}%`,
          },
        },
      ],
    }
  }

  if (category) {
    where = {
      category,
    }
  }
  const sequelizeProductData = await Product.findAll({ where })
  const products = JSON.parse(JSON.stringify(sequelizeProductData))

  for (const product of products) {
    product.rating = await calculateAverageRating(product.id)
    product.numberOfRatings = await calculateHowManyRatings(product.id)
  }

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

router.post('/:id/rating', userExtractor, async (req, res) => {
  const newRating = { ...req.body, userId: req.user }
  await Rating.create(newRating)
  res.status(201).end()
})

router.put('/:id', userExtractor, adminExtractor, async (req, res) => {
  const productId = req.params.id
  const changes = req.body
  const product = await Product.findByPk(productId)
  if (!product) {
    return res.status(404).json({ error: 'No product with given id' })
  }
  const newProduct = await Product.update(changes, { where: { id: productId } })
  res.status(200).json(newProduct)
})

router.delete('/:id', userExtractor, adminExtractor, async (req, res) => {
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
