const knex = require('../db')

createOrIncrement = (user_id, stock_id, quantity) => {
  return knex('holdings')
    .where({ user_id, stock_id })
    .then((results) => {
      if (results.length === 1) {
        return knex('holdings')
          .where({ user_id, stock_id})
          .increment('quantity', quantity)
      } else {
        return knex('holdings')
          .insert({ user_id, stock_id, quantity })
      }
    })
}

getAll = () => {
  return knex('holdings')
    .select()
}

module.exports = {
  createOrIncrement,
  getAll
}

