const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'product',
  }
)

module.exports = Product
