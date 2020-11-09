const redis = require('redis')

class Redis {
  constructor (options) {
    this.options = options
  }

  async init () {
    this.client = await redis.createClient(this.options)
    this.subscribers = []
  }

  publish (key, message) {
    return this.client.publish(key, Buffer.from(message))
  }

  async subscribe (topic, cb) {
    const subscriber = await redis.createClient(this.options)
    subscriber.psubscribe(topic)
    subscriber.on('pmessage', cb)
    this.subscribers.push(subscriber)
    return subscriber
  }

  get (...args) {
    return new Promise((resolve, reject) => {
      this.client.get(...args, (error, result) => error ? reject(error) : resolve(result))
    })
  }

  set (...args) {
    return new Promise((resolve, reject) => {
      this.client.set(...args, (error, result) => error ? reject(error) : resolve(result))
    })
  }

  del (...args) {
    return new Promise((resolve, reject) => {
      this.client.del(...args, (error, result) => error ? reject(error) : resolve(result))
    })
  }

  exists (...args) {
    return new Promise((resolve, reject) => {
      this.client.exists(...args, (error, result) => error ? reject(error) : resolve(result))
    })
  }

  close () {
    this.client.end(true)
    this.subscribers.forEach(subscriber => subscriber.end(true))
  }
}

module.exports = Redis
