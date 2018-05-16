const holdings = require('../models/holdings')
const stocks = require('../models/stocks')
const transactions = require('../models/transactions')
const users = require('../models/users')

buy = async (req, res, next) => {
  const { symbol } = req.params;
  const { userId, quantity, price } = req.body;

  const stock = await stocks.getBySymbol(symbol)

  // 5. Ensure the stock exists
  // 6. fetch the user and make sure they have enough cash

  await users.decrementCash(userId, price * quantity)
  await holdings.createOrIncrement(userId, stock.id, quantity)

  const transaction = {
    user_id: userId,
    stock_id: stock.id,
    price,
    quantity,
    total: price * quantity,
    type: 'buy'
  }

  await transactions.create(transaction)
  // 1. Look up the stock by symbol (req.params.symbol)
  // 2. Add the stock to holdings (holdings.create or holdings.update)
  // 3. Create a transaction (transactions.create)
  // 4. Update the user's cash (users.update)
  // 5. Add some error handling (make sure stock exists, make sure user has enough cash)
}

sell = (req, res, next) => {
  return res.status(501).json({
    error: 'Not Implemented'
  })
}

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
