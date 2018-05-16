const stocks = require('../models/stocks')
// const transactions = require('../models/transactions')
const users = require('../models/users')

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

module.exports = {
  buy,
  getAll,
  getBySymbol,
  sell
}
