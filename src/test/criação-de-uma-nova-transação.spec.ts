// Third party
import { expect, test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

// Projects
import { server } from '../app'

beforeAll(async () => {
  await server.ready()
}) // ANTES de inciar testes, vai aguardar tadas rotas serem cadastradas

afterAll(async () => {
  await server.close()
}) // DEPOIS de executar todos os meus testes, eu quero fechar a aplicação removendo da mémoria

// Teste pelo server
test('Testando a criação de uma nova transição', async () => {
  const response = await request(server.server).post('/transactions').send({
    title: 'New transaction',
    amount: 5000,
    type: 'credit',
  })

  expect(response.statusCode).toEqual(201)
})
