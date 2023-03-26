// Third party
import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'

// Local
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

export const server = fastify()

// Executa na ordem
server.register(cors, {
  origin: env.ALLOWED_ORIGINS,
  credentials: true,
  methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH'],
})
server.register(cookie)
server.register(transactionsRoutes, {
  prefix: 'transactions',
})
