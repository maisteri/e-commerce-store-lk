const path = require('path')
const router = require('express').Router()

router.get(['/cart', '/checkout', '/signin', '/signup'], function (req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'))
})

module.exports = router
