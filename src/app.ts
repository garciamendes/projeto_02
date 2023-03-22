// Third party
import fastify from 'fastify'
import cookie from '@fastify/cookie'

// Local
import { transactionsRoutes } from './routes/transactions'

export const server = fastify()

// Executa na ordem
server.register(cookie)
server.register(transactionsRoutes, {
  prefix: 'transactions',
})
