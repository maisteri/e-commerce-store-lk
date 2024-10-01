const supertest = require('supertest')
const helper = require('./test_helper')
const { sequelize } = require('../utils/db')
const app = require('../app')
const api = supertest(app)
const { User } = require('../models')
const { expect, test } = require('@jest/globals')

beforeEach(async () => {
  const users = await User.findAll({})
  for (const user of users) {
    await user.destroy()
  }
  await User.create(helper.testUsers[2])
})

describe('a new user can register', () => {
  test('users POST: user registration returns 201 and user details as json. Returned user details are correct and they include an id.', async () => {
    const newUser = await api
      .post('/v1/api/users')
      .send(helper.testUsers[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(newUser.body.token).toBeDefined()
    expect(newUser.body.name).toBe(helper.testUsers[0].name)
  })

  test('missing mandatory parameters in user registration return error code 400: bad request', async () => {
    await api.post('/v1/api/users').send(helper.testUsers[1]).expect(400)
  })

  test('error code 400 is returned if username is not unique and error message is correct', async () => {
    const response = await api
      .post('/v1/api/users')
      .send(helper.testUsers[2])
      .expect(400)

    expect(response.body.error).toBe('Mandatory parameters missing.')
  })

  test('error code 400 is returned if username is not email format and error message is correct', async () => {
    const response = await api
      .post('/v1/api/users')
      .send(helper.testUsers[3])
      .expect(400)

    expect(response.body.error[0]).toBe('Email address must be a valid. ')
  })
})

afterAll(async () => {
  await sequelize.close()
})
