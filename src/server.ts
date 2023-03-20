// Third party
import fastify from 'fastify'

const server = fastify()

server.get('/', () => {
  return 'Hello World'
})

server.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running!')
})
