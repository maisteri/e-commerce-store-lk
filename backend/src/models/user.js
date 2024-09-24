const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-zA-ZäöåÄÖÅ]+\s[a-zA-ZäöåÄÖÅ]+$/,
          msg: 'Name can only contain alphabets. Both first and last name must be present. ',
        },
        len: {
          args: [3, 50],
          msg: 'Name must be between 2 and 50 characters long. ',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email address must be a valid. ',
        },
      },
    },
    passwordHash: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user',
  }
)

module.exports = User
