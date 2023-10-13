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
  await User.create(helper.testUsersLogin[0])
})

describe('user login', () => {
  test('registered user can login', async () => {
    const response = await api
      .post('/v1/api/login')
      .send(helper.testUsersLogin[1])
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
    expect(response.body.name).toBe(helper.testUsersLogin[0].name)
    expect(response.body.username).toBe(helper.testUsersLogin[1].username)
  })

  test('login fails with non-existing username', async () => {
    const response = await api
      .post('/v1/api/login')
      .send(helper.testUsersLogin[2])
      .expect(404)

    expect(response.body.error).toBe('No such username')
  })

  test('login fails with wrong password', async () => {
    const response = await api
      .post('/v1/api/login')
      .send(helper.testUsersLogin[3])
      .expect(403)

    expect(response.body.error).toBe('Wrong password')
  })
})

afterAll(async () => {
  await sequelize.close()
})
