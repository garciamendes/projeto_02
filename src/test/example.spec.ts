// Third party
import { expect, test } from 'vitest'

test('[CERTO] - o usuário consegue criar uma nova transação', () => {
  // Fazer a chamada HTTP p/ criar uma nova transação
  const responseStatusCode = 201

  expect(responseStatusCode).toEqual(201)
})

test('[ERRADO] - o usuário consegue criar uma nova transação', () => {
  // Fazer a chamada HTTP p/ criar uma nova transação
  const responseStatusCode = 500

  expect(responseStatusCode).not.toEqual(201)
})
