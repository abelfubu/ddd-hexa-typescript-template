import knex from 'knex'

export const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'example',
    database: 'tasks',
    port: 5432,
  },
})
