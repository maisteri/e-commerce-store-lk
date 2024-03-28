const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Address extends Model {}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    streetAddress: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    zip: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'address',
  }
)

module.exports = Address
