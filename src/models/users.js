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
  return knex('users')
    .where({ id })
    .decrement('cash', amount);
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
  tryLogin
}
