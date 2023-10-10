const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')

const { connectToDatabase } = require('./utils/db')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const productsRouter = require('./controllers/products')
const { tokenExtractor, errorHandler } = require('./utils/middleware')

connectToDatabase()
  .then(() => {
    console.log('Connected to database')
  })
  .catch((error) => {
    console.error('Error connecting to database: ', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

app.use('/v1/api/login', loginRouter)
app.use('/v1/api/users', usersRouter)
app.use('/v1/api/products', productsRouter)

app.use(errorHandler)

module.exports = app
