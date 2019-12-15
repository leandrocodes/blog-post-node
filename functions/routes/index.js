const express = require('express')
let router = express.Router()

router.use('/products', require('./products'))
router.use('/hello', require('./hello'))

module.exports = router