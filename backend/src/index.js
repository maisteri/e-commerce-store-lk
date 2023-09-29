const { connectToDatabase } = require('./util/db')
const express = require('express')
const { User } = require('./models')
const app = express()
app.use(express.json())

const PORT = 3000

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
