const User = require('./user')
const Order = require('./order')
const ShoppingCart = require('./shoppingCart')
const Address = require('./address')
const Product = require('./product')
const Rating = require('./rating')
const ShoppingCartItem = require('./shoppingCartItem')

User.hasMany(Order)
User.hasMany(ShoppingCart)
User.hasMany(Address)

Address.belongsTo(User)

Rating.belongsTo(User)
Rating.belongsTo(Product)

Product.hasMany(Rating)

ShoppingCart.hasMany(ShoppingCartItem)
ShoppingCart.belongsTo(User)
ShoppingCart.belongsTo(Order)

ShoppingCartItem.belongsTo(ShoppingCart)
ShoppingCartItem.belongsTo(Product)

Order.belongsTo(ShoppingCart)
Order.belongsTo(User)
Order.belongsTo(Address)

User.sync({ alter: true })
Order.sync({ alter: true })
ShoppingCart.sync({ alter: true })
Address.sync({ alter: true })
Product.sync({ alter: true })
Rating.sync({ alter: true })
ShoppingCartItem.sync({ alter: true })

module.exports = {
  User,
  Order,
  ShoppingCart,
  ShoppingCartItem,
  Address,
  Product,
  Rating,
}
