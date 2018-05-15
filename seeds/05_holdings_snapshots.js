
exports.seed = function(knex, Promise) {
  return Promise.resolve() 
   .then(() => knex('holdings_snapshots').del())
   .then(() => knex('holdings_snapshots').insert(
    [
      {id: 1, portfolio_value: 16050},
      {id: 2, portfolio_value: 16151},
      {id: 3, portfolio_value: 16252},
      {id: 4, portfolio_value: 16353},
      {id: 5, portfolio_value: 16454}
    ]))
    .then(() => {
      return knex.raw(
        `SELECT setval('holdings_snapshots_id_seq', (SELECT MAX(id) FROM holdings_snapshots));`
      );
    });
};
