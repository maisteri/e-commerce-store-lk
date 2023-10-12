const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const { Product, User } = require('../models')
const { expect, test } = require('@jest/globals')

let adminToken = ''
let userToken = ''

beforeEach(async () => {
  await Product.destroy({ where: {} })
  await User.destroy({ where: {} })
  await Product.bulkCreate(helper.testProducts)
  const tokens = (await User.bulkCreate(helper.productAddUsers)).map(
    helper.calcToken
  )
  adminToken = tokens[0]
  userToken = tokens[1]
})

describe('products can be fetched', () => {
  test('a correct product list is returned', async () => {
    const { body } = await api
      .get('/v1/api/products')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    body.forEach((product) => {
      delete product.id
      delete product.createdAt
      delete product.updatedAt
      return product
    })
    expect(body).toEqual(expect.arrayContaining(helper.testProducts))
  })
})

describe('admin user can add new products', () => {
  test('a new product can be added by admin user', async () => {
    const newProduct = await api
      .post('/v1/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(helper.productsToBeAdded[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(newProduct.body).toHaveProperty('id')
    expect(newProduct.body).toHaveProperty('createdAt')
    expect(newProduct.body).toHaveProperty('updatedAt')
    expect(newProduct.body).toMatchObject(helper.productsToBeAdded[0])
  })

  test('a list of new product can be added by admin user', async () => {
    await api
      .post('/v1/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(helper.productsToBeAdded)
      .expect(204)
  })

  test('a normal user cant add new products', async () => {
    await api
      .post('/v1/api/products')
      .set('Authorization', `Bearer ${userToken}`)
      .send(helper.productsToBeAdded)
      .expect(403)
  })

  test('a non registered user cant add new products', async () => {
    await api
      .post('/v1/api/products')
      .send(helper.productsToBeAdded)
      .expect(401)
  })
})

describe('admin user can delete a product', () => {
  test('product delete succeeds with 204 if id is valid', async () => {
    const productIds = (await helper.productsInDb()).map(
      (product) => product.id
    )

    await api
      .delete(`/v1/api/products/${productIds[0]}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(204)

    const productsAfterDelete = await helper.productsInDb()
    expect(productsAfterDelete).toHaveLength(helper.testProducts.length - 1)

    const productIdsAfterDelete = productsAfterDelete.map(
      (product) => product.id
    )
    expect(productIdsAfterDelete).not.toContain(productIds[0])
  })

  test('normal user cant delete a product', async () => {
    const productIds = (await helper.productsInDb()).map(
      (product) => product.id
    )
    await api
      .delete(`/v1/api/products/${productIds[0]}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403)
  })

  test('product delete fails with 404 if id is invalid', async () => {
    await api
      .delete('/v1/api/products/0')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(404)
  })
})

describe('admin user can change product details', () => {
  test('detail change succeeds with 200 when changes and id are valid', async () => {
    const productIds = await helper.productsInDatabaseIds()
    const { body } = await api
      .put(`/v1/api/products/${productIds[0]}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(helper.productChangeDetails)
      .expect(200)

    expect(body).toContain(1)
    const products = await helper.productsInDb()
    const changedProduct = products[helper.testProducts.length - 1]
    expect(changedProduct.title).toBe(helper.productChangeDetails.title)
    expect(changedProduct.price).toBe(helper.productChangeDetails.price)
    expect(changedProduct.imageUrl).toBe(helper.productChangeDetails.imageUrl)
    expect(changedProduct.description).toBe(
      helper.productChangeDetails.description
    )
  })

  test('detail change fail with 400 when data is not valid', async () => {
    const productIds = await helper.productsInDatabaseIds()
    await api
      .put(`/v1/api/products/${productIds[0]}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(helper.invalidProductChangeDetails)
      .expect(400)
  })

  test('detail change fails with 404 if id not valid', async () => {
    await api
      .put('/v1/api/products/0')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(helper.productChangeDetails)
      .expect(404)
  })

  test('normal user making changes returns 403', async () => {
    const productIds = await helper.productsInDatabaseIds()
    await api
      .put(`/v1/api/products/${productIds[0]}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send(helper.productChangeDetails)
      .expect(403)
  })
})

afterAll(async () => {})
