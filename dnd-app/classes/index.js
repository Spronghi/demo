'use strict'

const decorate = require('./decorate')
const handlers = require('./handlers')
const schemas = require('./schemas')

module.exports = async (fastify, opts) => {
  fastify.register(decorate)

  fastify.get('/', { schema: schemas.getAll }, handlers.getAll)
  fastify.get('/:id', { schema: schemas.get }, handlers.get)
  fastify.post('/', { schema: schemas.post }, handlers.post)
  fastify.put('/:id', { schema: schemas.put }, handlers.put)
  fastify.patch('/:id', { schema: schemas.put }, handlers.put)
  fastify.delete('/:id', { schema: schemas.delete_ }, handlers.delete_)

  fastify.setErrorHandler((error, request, response) => {
    response.send(error)
  })
}
