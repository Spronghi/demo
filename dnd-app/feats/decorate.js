const fp = require('fastify-plugin')
const Service = require('./service')

module.exports = fp(async fastify => {
  const collection = await fastify.mongo.db.createCollection('feats')

  const service = new Service(collection)
  await service.ensureIndexes(fastify.mongo.db)

  fastify.decorateRequest('featsService', service)
})
