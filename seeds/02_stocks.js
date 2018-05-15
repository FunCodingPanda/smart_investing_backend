const axios = require('axios')

exports.seed = function(knex, Promise) {
  return Promise.resolve()
    .then(() => knex('stocks').del())
    .then(() => axios.get('https://api.iextrading.com/1.0/ref-data/symbols'))
    .then((response) => response.data)
    .then((stocks) => knex('stocks').insert(
      stocks.map((stock, id) => ({id, ticker_symbol: stock.symbol, name: stock.name}))
    ))
    .then(() => {
      return knex.raw(
        `SELECT setval('stocks_id_seq', (SELECT MAX(id) FROM stocks));`
      );
    });
};
