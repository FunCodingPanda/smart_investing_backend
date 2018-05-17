const express = require('express')
const router = express.Router()
const usersCtrl = require('../controllers/users')
const holdingsCtrl = require('../controllers/holdings')

router.post('/', usersCtrl.create)
router.get('/', usersCtrl.getAll)
router.get('/:id', usersCtrl.getById)

router.get('/:id/holdings', holdingsCtrl.getByUserId)

module.exports = router
