'use strict'
/*
 * This module initialize MongoDB and register the client to connect to it.
 * I didn't use mongoose because I didn't need it. 
 */
const fp = require('fastify-plugin')
const envSchema = require('env-schema')
const { MongoClient } = require('mongodb')
const { configs: schema } = require('./schemas')

async function fastifyMongodb (fastify, options, next) {
  try {
    const { MONGODB: url } = envSchema({ schema })
    const tokens = /\w\/([^?]*)/g.exec(url)
    const db = tokens && tokens[1]
    const client = await MongoClient.connect(url)
    if (db) client.db = client.db(db)
    fastify.log.debug('mongodb is available at ' + url)
    fastify.decorate('mongo', client)
    fastify.addHook('onClose', () => client.close())
  } catch (error) {
    next(new Error(error))
  }
  next()
}

module.exports = fp(fastifyMongodb, {
  fastify: '>=1.0.0',
  name: 'fastify-mongodb'
})
