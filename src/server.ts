// Third party
import fastify from 'fastify'

// Local
import { env } from './env'
import { knex } from './database'

const server = fastify()

server.get('/', async () => {
  const transactions = await knex('transactions')
    .where('amount', 1000)
    .select('*')

  return transactions
})

server.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running!')
})
