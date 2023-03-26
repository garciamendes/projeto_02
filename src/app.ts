// Third party
import 'dotenv/config'
import fastify from 'fastify'
import cors from 'fastify-cors'
import cookie from '@fastify/cookie'

// Local
import { transactionsRoutes } from './routes/transactions'

export const server = fastify()

// Executa na ordem
server.register(cors, {
  origin: [process.env.ALLOWED_ORIGINS],
  methods: ['GET', 'POST'],
})
server.register(cookie)
server.register(transactionsRoutes, {
  prefix: 'transactions',
})
