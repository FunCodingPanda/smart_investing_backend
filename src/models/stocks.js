const knex = require('../db')

getAll = () => {
  return knex('stocks')
    .select()
}

getBySymbol = (symbol) => {
  return knex('stocks')
    .first()
    .where({ ticker_symbol: symbol })
}

module.exports = {
  getAll,
  getBySymbol
}
