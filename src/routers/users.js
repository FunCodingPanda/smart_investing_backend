const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/users')

router.post('/', ctrl.create)
router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getById)

module.exports = router
