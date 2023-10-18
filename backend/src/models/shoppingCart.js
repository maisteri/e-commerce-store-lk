const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class ShoppingCart extends Model {}

ShoppingCart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    current: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    sessionId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'shoppingCart',
  }
)

module.exports = ShoppingCart
