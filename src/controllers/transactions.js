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

getByUserId = (req, res, next) => {
  transactions.getByUserId(req.params.id).then((transactions, error) => {
    if (error) {
      res.status(404).json({
        error: 'transactions not found'
      })
    } else {
      res.status(200).json(transactions)
    }
  })
}

module.exports = {
  getAll,
  getByUserId
}
