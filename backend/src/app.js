const express = require('express')
const path = require('path')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const cors = require('cors')
require('express-async-errors')

const { connectToDatabase, sequelize } = require('./utils/db')
const { SECRET, NODE_ENV } = require('./utils/config')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const productsRouter = require('./controllers/products')
const cartRouter = require('./controllers/cart')
const addressRouter = require('./controllers/address')
const orderRouter = require('./controllers/order')
const staticRouter = require('./controllers/static')
const { tokenExtractor, errorHandler } = require('./utils/middleware')

connectToDatabase()
  .then(() => {
    console.log('Connected to database')
  })
  .catch((error) => {
    console.error('Error connecting to database: ', error.message)
  })

const app = express()
const sessionStore = new SequelizeStore({
  db: sequelize,
})

app.use(
  session({
    secret: SECRET,
    store: sessionStore,
    resave: false,
    proxy: false,
    cookie: {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000000),
    },
  })
)
sessionStore.sync()

if (NODE_ENV === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  )
}

app.use(express.json())
app.use(tokenExtractor)

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(staticRouter)

console.log('DIR_NAME: ', __dirname)
console.log('ENVI: ', NODE_ENV)

app.use('/v1/api/login', loginRouter)
app.use('/v1/api/users', usersRouter)
app.use('/v1/api/products', productsRouter)
app.use('/v1/api/cart', cartRouter)
app.use('/v1/api/address', addressRouter)
app.use('/v1/api/order', orderRouter)

app.use(errorHandler)

module.exports = app
