// Third party
import { expect, beforeAll, afterAll, describe, it, beforeEach } from 'vitest'
import request from 'supertest'
import { execSync } from 'node:child_process'

// Projects
import { server } from '../app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await server.ready()
  }) // ANTES de inciar testes, vai aguardar tadas rotas serem cadastradas

  afterAll(async () => {
    await server.close()
  }) // DEPOIS de executar todos os meus testes, eu quero fechar a aplicação removendo da mémoria

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  }) // ANTES de CADA teste iniciar

  // Teste pelo server
  it('Testando a criação de uma nova transição', async () => {
    const response = await request(server.server).post('/transactions').send({
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    })

    expect(response.statusCode).toEqual(201)
  })

  /**
   * it {
   *  skip: Para pular o teste,
   *  todo: Lembrar para fazer o teste no futuro
   *  only: Rodar somente um teste específico
   * }
   */

  it('Listando todas as transações', async () => {
    const responseCreateTransaction = await request(server.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
    const cookies = responseCreateTransaction.get('Set-Cookie')

    const responseListTrasactions = await request(server.server)
      .get('/transactions')
      .set('Cookie', cookies)

    expect(responseListTrasactions.body.results).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })

  it('Pegando uma transação específica', async () => {
    const responseCreateTransaction = await request(server.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
    const cookies = responseCreateTransaction.get('Set-Cookie')

    const responseListTrasactions = await request(server.server)
      .get('/transactions')
      .set('Cookie', cookies)

    const transactionId = responseListTrasactions.body.results[0].id
    const responseGetTransaction = await request(server.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)

    expect(responseGetTransaction.body).toEqual(
      expect.objectContaining(responseListTrasactions.body.results[0]),
    )
  })
})
