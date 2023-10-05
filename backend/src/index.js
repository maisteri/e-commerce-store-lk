const { connectToDatabase } = require('./util/db')
const express = require('express')
const { User } = require('./models')
const { PORT } = require('./util/config')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const productsRouter = require('./controllers/products')
const { tokenExtractor } = require('./util/middleware')

const app = express()
app.use(express.json())
app.use(tokenExtractor)

app.use('/v1/api/login', loginRouter)
app.use('/v1/api/users', usersRouter)
app.use('/v1/api/products', productsRouter)

app.get('/ping', async (_req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
  })
  res.json(users)
})

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
