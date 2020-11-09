/*
 * The module that decorate the requests with the service that this microservice
 * implements
 */
const fp = require('fastify-plugin')
const Service = require('./service')

module.exports = fp(async fastify => {
  const collection = await fastify.mongo.db.createCollection('characters')

  const service = new Service(collection)
  await service.ensureIndexes(fastify.mongo.db)

  fastify.decorateRequest('charactersService', service)
})
