const stocks = require('../models/stocks')
// const transactions = require('../models/transactions')
const users = require('../models/users')
const holdings = require('../models/holdings')

getAll = (req, res, next) => {
  stocks.getAll().then((stocks, error) => {
    if (error) {
      res.status(500).json({
        error: 'Failed to get stocks'
      })
    } else {
      res.status(200).json({
        stocks
      })
    }
  })
}

getBySymbol = (req, res, next) => {
  stocks.getBySymbol(req.params.symbol).then((stock, error) => {
    if (error) {
      res.status(404).json({
        error: 'Stock not found'
      })
    } else {
      res.status(200).json(stock)
    }
  })
}

getByUserId = (req, res, next) => {
  holdings.getByUserId(req.params.id).then((holdings, error) => {
    if (error) {
      res.status(404).json({
        error: 'Holdings not found'
      })
    } else {
      res.status(200).json(holdings)
    }
  })
}

module.exports = {
  getAll,
  getBySymbol,
  getByUserId
}
