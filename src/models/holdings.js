const knex = require('../db')

createOrIncrement = (user_id, stock_id, quantity) => {
  return knex('holdings')
    .where({ user_id, stock_id })
    .then((results) => {
      if (results.length === 1) {
        return knex('holdings')
          .returning('*')
          .where({ user_id, stock_id})
          .increment('quantity', quantity)
          .then(holdings => holdings[0]);
      } else {
        return knex('holdings')
          .returning('*')
          .insert({ user_id, stock_id, quantity })
          .then(holdings => holdings[0]);
      }
    })
}

decrement = (user_id, stock_id, quantity) => {
  return knex('holdings')
    .returning('*')
    .where({ user_id, stock_id })
    .decrement('quantity', quantity)
    .then(holdings => holdings[0]);
}

getByUserId = (user_id) => {
  // SELECT holdings.quantity, stocks.ticker_symbol, stocks.name
  // FROM holdings
  // JOIN stocks
  // ON holdings.stock_id = stocks.id
  // WHERE user_id = 4;
  return knex('holdings')
    .join('stocks', 'stocks.id', 'holdings.stock_id')
    .select('holdings.quantity', 'stocks.ticker_symbol', 'stocks.name')
    .where('holdings.user_id', '=', user_id)
}

//

getAll = () => {
  return knex('holdings')
    .select()
}

module.exports = {
  createOrIncrement,
  decrement,
  getByUserId,
  getAll
 
}

