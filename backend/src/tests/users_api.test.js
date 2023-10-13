const supertest = require('supertest')
const helper = require('./test_helper')
const { sequelize } = require('../utils/db')
const app = require('../app')
const api = supertest(app)
const { User } = require('../models')
const { expect, test } = require('@jest/globals')

// const Note = require('../models/note')

beforeEach(async () => {
  const users = await User.findAll({})
  for (const user of users) {
    await user.destroy()
  }
  await User.create(helper.testUsers[2])
  // await Note.deleteMany({})
  // await Note.insertMany(helper.initialNotes)
})

describe('a new user can register', () => {
  // test('notes are returned as json', async () => {
  //   await api
  //     .get('/api/notes')
  //     .expect(200)
  //     .expect('Content-Type', /application\/json/)
  // })
  // test('all notes are returned', async () => {
  //   const response = await api.get('/api/notes')
  //   expect(response.body).toHaveLength(helper.initialNotes.length)
  // })
  // test('a specific note is within the returned notes', async () => {
  //   const response = await api.get('/api/notes')
  //   const contents = response.body.map((r) => r.content)
  //   expect(contents).toContain('Browser can execute only JavaScript')
  // })
  test('users POST: user registration returns 201 and user details as json. Returned user details are correct and they include an id.', async () => {
    const newUser = await api
      .post('/v1/api/users')
      .send(helper.testUsers[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(newUser.body.id).toBeDefined()
    expect(newUser.body.name).toBe(helper.testUsers[0].name)
    expect(newUser.body.username).toBe(helper.testUsers[0].username)
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

    expect(response.body.error[0]).toBe('Validation isEmail on username failed')
  })
})

// describe('viewing a specific note', () => {
//   test('succeeds with a valid id', async () => {
//     const notesAtStart = await helper.notesInDb()

//     const noteToView = notesAtStart[0]

//     const resultNote = await api
//       .get(`/api/notes/${noteToView.id}`)
//       .expect(200)
//       .expect('Content-Type', /application\/json/)

//     expect(resultNote.body).toEqual(noteToView)
//   })

//   test('fails with statuscode 404 if note does not exist', async () => {
//     const validNonexistingId = await helper.nonExistingId()

//     await api.get(`/api/notes/${validNonexistingId}`).expect(404)
//   })

//   test('fails with statuscode 400 if id is invalid', async () => {
//     const invalidId = '5a3d5da59070081a82a3445'

//     await api.get(`/api/notes/${invalidId}`).expect(400)
//   })
// })

// describe('addition of a new note', () => {
//   test('succeeds with valid data', async () => {
//     const newNote = {
//       content: 'async/await simplifies making async calls',
//       important: true,
//     }

//     await api
//       .post('/api/notes')
//       .send(newNote)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//     const notesAtEnd = await helper.notesInDb()
//     expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

//     const contents = notesAtEnd.map((n) => n.content)
//     expect(contents).toContain('async/await simplifies making async calls')
//   })

//   test('fails with status code 400 if data invalid', async () => {
//     const newNote = {
//       important: true,
//     }

//     await api.post('/api/notes').send(newNote).expect(400)

//     const notesAtEnd = await helper.notesInDb()

//     expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
//   })
// })

// describe('deletion of a note', () => {
//   test('succeeds with status code 204 if id is valid', async () => {
//     const notesAtStart = await helper.notesInDb()
//     const noteToDelete = notesAtStart[0]

//     await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

//     const notesAtEnd = await helper.notesInDb()

//     expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

//     const contents = notesAtEnd.map((r) => r.content)

//     expect(contents).not.toContain(noteToDelete.content)
//   })
// })

afterAll(async () => {
  await sequelize.close()
})
