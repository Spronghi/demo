'use strict'
/*
 * This module initialize Redis and register the client to connect to it.
 */
const fp = require('fastify-plugin')
const envSchema = require('env-schema')
const Redis = require('./redis')
const { configs: schema } = require('./schemas')

async function fastifyRedis (fastify, options, next) {
  try {
    const { REDIS: url } = envSchema({ schema })
    const client = new Redis({ url })
    await client.init()
    fastify.log.debug(`redis client is available at ${url}`)
    fastify.decorate('redis', client)
    fastify.addHook('onClose', () => client.close())
  } catch (err) {
    return next(err)
  }
  next()
}

module.exports = fp(fastifyRedis, {
  fastify: '>=1.x',
  name: 'fastify-redis'
})
