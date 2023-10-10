require('dotenv').config()

const DATABASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_TEST
const PORT = process.env.PORT
const SECRET = process.env.SECRET

module.exports = {
  DATABASE_URL,
  PORT,
  SECRET,
}
