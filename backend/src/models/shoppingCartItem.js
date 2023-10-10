const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class ShoppingCartItem extends Model {}

ShoppingCartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'shoppingCartItem',
  }
)

module.exports = ShoppingCartItem
