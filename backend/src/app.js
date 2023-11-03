const express = require('express')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const cors = require('cors')
require('express-async-errors')

const { connectToDatabase, sequelize } = require('./utils/db')
const { SECRET } = require('./utils/config')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const productsRouter = require('./controllers/products')
const cartRouter = require('./controllers/cart')
const {
  tokenExtractor,
  errorHandler,
  corsDevRules,
} = require('./utils/middleware')

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
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: false, // if you do SSL outside of node.
    cookie: {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000000), // Set the expire date to 1000 hour from now
      // secure: true,
      // sameSite: 'none',
    },
  })
)
sessionStore.sync()

app.use(cors())
app.use(corsDevRules)
app.use(express.json())
app.use(tokenExtractor)

app.use('/v1/api/login', loginRouter)
app.use('/v1/api/users', usersRouter)
app.use('/v1/api/products', productsRouter)
app.use('/v1/api/cart', cartRouter)

app.use(errorHandler)

module.exports = app
