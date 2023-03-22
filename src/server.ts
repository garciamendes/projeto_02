// Third party
import fastify from 'fastify'
import cookie from '@fastify/cookie'

// Local
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const server = fastify()

// Executa na ordem
server.register(cookie)
server.register(transactionsRoutes, {
  prefix: 'transactions',
})

server.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running!')
})
