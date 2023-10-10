const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    deliveryMethod: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    paymentMethod: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    paymentStatus: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    deliveryStatus: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'order',
  }
)

module.exports = Order
