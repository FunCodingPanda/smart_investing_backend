
exports.seed = function(knex, Promise) {
  return Promise.resolve() 
   .then(() => knex('transactions').del())
   .then(() => knex('transactions').insert(
    [
      {id: 1, price: 97.23, quantity: 2, total: 97.23 * 2, type: 'buy', user_id: 1, stock_id: 5161},
      {id: 2, price: 98.01, quantity: 2, total: 98.01 * 2, type: 'sell', user_id: 1, stock_id: 5161},
      {id: 3, price: 97.44, quantity: 2, total: 97.44 * 2, type: 'buy', user_id: 1, stock_id: 5161}
    ]))
    .then(() => {
      return knex.raw(
        `SELECT setval('transactions_id_seq', (SELECT MAX(id) FROM transactions));`
      );
    });
};
