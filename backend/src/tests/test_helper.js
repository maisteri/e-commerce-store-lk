/* eslint-disable quotes */

const { Product } = require('../models')
const { SECRET } = require('../utils/config')
const jwt = require('jsonwebtoken')

const testProducts = [
  {
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: '109.95',
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  },
  {
    title: 'Mens Casual Premium Slim Fit T-Shirts ',
    price: '22.30',
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men's clothing",
    imageUrl:
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  },
  {
    title: 'Mens Cotton Jacket',
    price: '55.99',
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  },
]

const productsToBeAdded = [
  {
    title: 'Mens Cotton Jacket Second',
    price: '55.99',
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  },
  {
    title: 'Mens Casual Premium Slim Fit T-Shirts Second',
    price: '22.30',
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men's clothing",
    imageUrl:
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  },
]

const productChangeDetails = {
  title: 'title1',
  price: '1.00',
  description: 'description1',
  category: "men's clothing",
  imageUrl: 'https://image1.jpg',
}

const invalidProductChangeDetails = {
  price: '1.00',
  description: 'description1',
  category: "men's clothing",
  imageUrl: 'url',
}

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

const productAddUsers = [
  {
    username: 'admin@gmail.com',
    passwordHash:
      '$2b$10$ebket8AMyzckDyHdX1JWNuWBK.kA3tE2jfQ6W4x1AWiVnRXYJFMlS',
    name: 'Admin User',
    admin: true,
  },
  {
    username: 'user@gmail.com',
    passwordHash:
      '$2b$10$ebket8AMyzckDyHdX1JWNuWBK.kA3tE2jfQ6W4x1AWiVnRXYJFMlS',
    name: 'User User',
    admin: false,
  },
]

const calcToken = (user) => {
  const payload = {
    id: user.id,
  }
  return jwt.sign(payload, SECRET)
}

const productsInDb = async () => await Product.findAll({})
const productsInDatabaseIds = async () =>
  (await productsInDb()).map((product) => product.id)

module.exports = {
  testUsers,
  testUsersLogin,
  testProducts,
  productsToBeAdded,
  productAddUsers,
  calcToken,
  productsInDb,
  productsInDatabaseIds,
  productChangeDetails,
  invalidProductChangeDetails,
}
