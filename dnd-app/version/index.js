'use strict'

const { name: title, description, version } = require('.././package.json')

module.exports = async (fastify, opts) => {
  fastify.get('/', function (request, reply) {
    reply.send({ title, description, version })
  })

  fastify.setErrorHandler((error, request, response) => {
    response.send(error)
  })
}
