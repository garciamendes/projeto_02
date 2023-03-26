import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  DATABASE_URL_TEST: z.string().optional(),
  PORT: z.coerce.number().default(3333),
  ALLOWED_ORIGINS: z
    .string()
    .regex(
      /^(http:\/\/|https:\/\/)(www\.)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    )
    .default('*'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('ERROR: verifique suas envs', _env.error.format())
  throw new Error('ERROR: verifique suas envs')
}

export const env = _env.data
