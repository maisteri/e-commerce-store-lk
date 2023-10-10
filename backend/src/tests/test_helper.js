const testUsers = [
  {
    username: 'papadapaduu@gmail.com',
    password: 'passWORD123!',
    name: 'Karri Kivi',
  },
  {
    username: 'this.is.test@email.com',
    password: 'passWORD123!',
  },
  {
    username: 'thisUserNameExists@gmail.com',
    passwordHash:
      '$2b$10$ebket8AMyzckDyHdX1JWNuWBK.kA3tE2jfQ6W4x1AWiVnRXYJFMlS',
    name: 'Siiri Satu',
  },
  {
    username: 'notEmailFormat-gmail.com',
    password: 'passWORD123!',
    name: 'Siiri Satu',
  },
]

const testUsersLogin = [
  {
    username: 'testUserForLoginTest@gmail.com',
    passwordHash:
      '$2b$10$ebket8AMyzckDyHdX1JWNuWBK.kA3tE2jfQ6W4x1AWiVnRXYJFMlS',
    name: 'Siiri Satu',
  },
  {
    username: 'testUserForLoginTest@gmail.com',
    password: 'passWORD123!',
  },
  {
    username: 'testUserForLoginTest2@gmail.com',
    password: 'passWORD123!',
  },
  {
    username: 'testUserForLoginTest@gmail.com',
    password: 'passWORD123!!!!!!!',
  },
  {
    username: 'testUserForLoginTest@gmail.com',
  },
]

module.exports = {
  testUsers,
  testUsersLogin,
}
