'use strict'

const Fastify = require('fastify')
const server = require('./index')
const redis = require('redis')
const { MongoClient } = require('mongodb')

/*
 * This class is made fot test purpose. It initialize the server so I can test with easy just
 * calling the various API that I want to call
 */
class Suite {
  constructor (options) {
    this.options = options
  }

  async init () {
    this.fastify = Fastify({ logger: { level: 'debug' } })
    this.fastify.register(server, this.options)
    await this.fastify.ready()
  }

  async tearDown () {
    return this.fastify.close()
  }

  async http ({ query, method, headers = { 'Content-type': 'application/json' }, url, payload }) {
    const { statusCode, payload: result } = await this.fastify.inject({ method, url, headers, payload: JSON.stringify(payload), query })
    return { statusCode, payload: JSON.parse(result) }
  }

  async initRedis () {
    this.redis = await redis.createClient({ url: this.options.REDIS })
    this.subscriber = await redis.createClient({ url: this.options.REDIS })
  }

  async closeRedis () {
    await this.redis.end(true)
    await this.subscriber.end(true)
  }

  async initMongodb () {
    this.mongodb = await MongoClient.connect(this.options.MONGODB, { useNewUrlParser: true })
    this.db = this.mongodb.db('test')
  }

  async closeMongodb () {
    await this.mongodb.close()
  }
}

module.exports = Suite
