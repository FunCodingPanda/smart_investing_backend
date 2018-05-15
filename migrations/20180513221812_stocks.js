exports.up = (knex) => {
  return knex.schema.createTable('stocks', table => {
    table.increments()
    table.string('ticker_symbol')
    table.string('name')
    table.timestamps(true, true)
  })  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('stocks')
};
