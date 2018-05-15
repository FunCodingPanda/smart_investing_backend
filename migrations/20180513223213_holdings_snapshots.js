
exports.up = function(knex, Promise) {
  return knex.schema.createTable('holdings_snapshots', table => {
    table.increments()
    table.integer('user_id')
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.float('portfolio_value')
    table.timestamp(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('holdings_snapshots')
};
