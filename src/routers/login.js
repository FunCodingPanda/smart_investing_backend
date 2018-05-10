const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/login')

router.post('/', ctrl.loginUser)

module.exports = router
