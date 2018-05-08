exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'Test User', email: 'test@test.com', hashed_password: '', cash: 20000.00},
      ]);
    });
};
