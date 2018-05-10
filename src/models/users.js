const knex = require('../db')
const bcrypt = require('bcryptjs')

createUser = (user) => {
  return {error: 'Not implemented yet'}
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
  createUser,
  getAll,
  getById,
  getByEmail,
  tryLogin
}
