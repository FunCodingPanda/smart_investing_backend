const transactions = require('../models/transactions')

getAll = (req, res, next) => {
  transactions.getAll().then((transactions, error) => {
    if (error) {
      res.status(500).json({
        error: 'Failed to get transactions'
      })
    } else {
      res.status(200).json({
        transactions
      })
    }
  })
}

module.exports = {
  getAll
}
