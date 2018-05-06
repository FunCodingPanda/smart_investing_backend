module.exports = {
  development: { client: 'pg', connection: { database: 'smart_investing' } },
  test: { client: 'pg', connection: { database: 'smart_investing' } },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};