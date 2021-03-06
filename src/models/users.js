const knex = require('../db')
const bcrypt = require('bcryptjs')

create = (user) => {
  const hashed_password = bcrypt.hashSync(user.password, 8)
  delete user.password
  return knex('users')
    .returning('*')
    .insert({...user, hashed_password})
    .then(results => results[0])
}

decrementCash = (id, amount) => {
  // ex: "UPDATE users SET cash = cash - 5 WHERE id = 1";
  // Normally this would use knex "decrement", however it has a bug when
  // dealing with floats: https://github.com/tgriesser/knex/issues/868
  // So instead a raw query is used.
  return knex.raw('UPDATE users SET cash = cash - :amount WHERE id = :id returning *', {
    id,
    amount
  }).then(result => result.rows[0]);
  // return knex('users')
  //   .where({ id })
  //   .returning('*')
  //   .decrement('cash', amount)
  //   .then(users => users[0]);
}

incrementCash = (id, amount) => {
  // ex: "UPDATE users SET cash = cash + 5 WHERE id = 1";
  return knex.raw('UPDATE users SET cash = cash + :amount WHERE id = :id returning *', {
    id,
    amount
  }).then(result => result.rows[0]);
  // return knex('users')
  //   .where({ id })
  //   .returning('*')
  //   .increment('cash', amount)
  //   .then(users => users[0]);
}

getAll = () => {
  return knex('users')
    .select()
}

getById = (id) => {
  return knex('users')
    .first()
    .where({ id })
}

getByEmail = (email) => {
  return knex('users')
    .first()
    .where({ email })
}

tryLogin = (email, password) => {
  return knex('users')
    .select('hashed_password')
    .first()
    .where({ email })
    .then(user => {
      if (!user) return false;
      return bcrypt.compareSync(password, user.hashed_password) ? true : false;
    })
}

module.exports = {
  create,
  decrementCash,
  getAll,
  getById,
  getByEmail,
  incrementCash,
  tryLogin
}
