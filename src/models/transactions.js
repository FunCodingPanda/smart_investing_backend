const knex = require('../db')

create = (transaction) => {
  return knex('transactions')
    .returning('*')
    .insert(transaction)
    .then(transactions => transactions[0]);
}

getAll = () => {
  return knex('transactions')
    .select()
}

getByUserId = (user_id) => {
  return knex('transactions')
    .join('stocks', 'stocks.id', 'transactions.stock_id')
    .select(
      'quantity',
      'price',
      'total',
      'ticker_symbol',
      'name',
      'transactions.created_at',
      'type')
    .where('transactions.user_id', '=', user_id)
    .orderBy('created_at', 'desc')
}

module.exports = {
  create,
  getAll,
  getByUserId
}
