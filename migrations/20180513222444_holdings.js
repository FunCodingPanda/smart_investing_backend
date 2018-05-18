
exports.up = function(knex, Promise) {
  return knex.schema.createTable('holdings', table => {
    table.increments()
    table.integer('user_id')
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.integer('stock_id')
    table.foreign('stock_id').references('id').inTable('stocks').onDelete('CASCADE')
    table.integer('quantity')
    table.timestamps(true, true)
 })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('holdings')
};
