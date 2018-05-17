const holdings = require('../models/holdings')
const stocks = require('../models/stocks')
const transactions = require('../models/transactions')
const users = require('../models/users')

buy = async (req, res, next) => {
  const { symbol } = req.params;
  const { userId, quantity, price } = req.body;

  const stock = await stocks.getBySymbol(symbol)
  if (!stock) {
    return res.status(404).json({
      error: 'Stock does not exist'
    });
  }

  let user = await users.getById(userId);
  if (user.cash < quantity * price) {
    return res.status(400).json({
      error: 'User does not have enough cash for this purchase'
    });
  }

  user = await users.decrementCash(userId, price * quantity)
  const holding = await holdings.createOrIncrement(userId, stock.id, quantity)

  const transaction = {
    user_id: userId,
    stock_id: stock.id,
    price,
    quantity,
    total: price * quantity,
    type: 'buy'
  }

  const createdTransaction = await transactions.create(transaction)

  return res.status(200).json({
    transaction: createdTransaction,
    holding: holding,
    cash: user.cash
  });
  
  // 1. Look up the stock by symbol (req.params.symbol)
  // 2. Add the stock to holdings (holdings.create or holdings.update)
  // 3. Create a transaction (transactions.create)
  // 4. Update the user's cash (users.update)
  // await users.update(user.cash) 
  // 5. Add some error handling (make sure stock exists, make sure user has enough cash)
}

sell = async (req, res, next) => {
  const { symbol } = req.params;
  const { userId, quantity, price } = req.body;

  const stock = await stocks.getBySymbol(symbol)
  if (!stock) {
    return res.status(404).json({
      error: 'Stock does not exist'
    });
  }

  let ids = await holdings.getByUserIdAndStockId(userId, stock.id);
  if (ids.quantity < quantity) {
    return res.status(400).json({
      error: `You only have ${ids.quantity} ${symbol}, but tried to sell ${quantity}`
    });
  }

  user = await users.incrementCash(userId, price * quantity)
  let holding = await holdings.decrement(userId, stock.id, quantity)

  const transaction = {
    user_id: userId,
    stock_id: stock.id,
    price,
    quantity,
    total: price * quantity,
    type: 'sell'
  }

  const createdTransaction = await transactions.create(transaction)

  return res.status(200).json({
    transaction: createdTransaction,
    holding: holding,
    cash: user.cash
  });
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
