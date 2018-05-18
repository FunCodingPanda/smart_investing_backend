
exports.up = function(knex, Promise) {
  return knex.schema.createTable('transactions', table => {
    table.increments()
    table.integer('user_id')
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.integer('stock_id')
    table.foreign('stock_id').references('id').inTable('stocks').onDelete('CASCADE')
    table.integer('quantity')
    table.float('price')
    table.float('total')
    table.enu('type', ['buy', 'sell'])
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('transactions')
};

//
// enum Dogs {
//   GOLDEN_RETRIEVER = 1,
//   CORGIE = 2,
//   SHNAUZER = 3,
//   ...
// };
