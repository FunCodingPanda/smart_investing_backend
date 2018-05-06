exports.up = (knex) => {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('name')
    table.string('email')
    table.string('hashed_password')
    table.float('cash')
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
