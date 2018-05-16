const knex = require('../db')

getAll = () => {
  return knex('stocks')
    .select()
}

getBySymbol = (symbol) => {
  return knex('stocks')
    .first()
    .where({ symbol })
}

module.exports = {
  getAll,
  getBySymbol
}
