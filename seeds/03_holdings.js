
exports.seed = function(knex, Promise) {
  return Promise.resolve() 
    .then(() => knex('holdings').del())
    .then(() => knex('holdings').insert(
      [
        {id: 1, quantity: 5, user_id: 1, stock_id: 25},
        {id: 2, quantity: 3, user_id: 1, stock_id: 140},
        {id: 3, quantity: 9, user_id: 1, stock_id: 846}
      ]
    ))
    .then(() => {
      return knex.raw(
        `SELECT setval('holdings_id_seq', (SELECT MAX(id) FROM holdings));`
      );
    });
};
