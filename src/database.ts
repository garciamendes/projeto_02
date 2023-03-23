// Third party
import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'

// Local
import { env } from './env'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename:
      env.NODE_ENV === 'test' ? env.DATABASE_URL_TEST : env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
}

export const knex = setupKnex(config)
