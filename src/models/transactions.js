const knex = require('../db')

create = (transaction) => {
  return knex('transactions')
    .returning('*')
    .insert(transaction)
}

getAll = () => {
  return knex('transactions')
    .select()
}

module.exports = {
  create,
  getAll
}
