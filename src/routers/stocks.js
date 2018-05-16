const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/stocks')

router.get('/', ctrl.getAll)
router.get('/:symbol', ctrl.getBySymbol)
router.post('/:symbol/buy', ctrl.buy)
router.post('/:symbol/sell', ctrl.sell)

module.exports = router
