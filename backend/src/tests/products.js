const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const { User } = require('../models')
const { expect, test } = require('@jest/globals')

// const Note = require('../models/note')

beforeEach(async () => {})

describe('a new user can register', () => {})

afterAll(async () => {
  //await mongoose.connection.close()
})
