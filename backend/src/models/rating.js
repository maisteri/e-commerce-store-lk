const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'rating',
  }
)

module.exports = Rating
