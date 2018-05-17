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

module.exports = {
  create,
  getAll
}
