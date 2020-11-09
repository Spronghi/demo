'use strict'

const Suite = require('../../suite')
const options = require('./options')
const { prefix } = require('../configs')

class Buffs extends Suite {
  constructor (tap) {
    super(options)
    this.tap = tap
  }

  async get (id) {
    return this.http({ method: 'GET', url: `${prefix}/${id}` })
  }

  async post (payload) {
    return this.http({ method: 'POST', url: prefix, payload })
  }

  async put (id, payload) {
    return this.http({ method: 'PUT', url: `${prefix}/${id}`, payload })
  }

  async delete_ (id) {
    return this.http({ method: 'DELETE', url: `${prefix}/${id}` })
  }

  async exists (id) {
    const { payload } = await this.get(id)
    return !!payload
  }

  async tearDown () {
    await this.closeRedis()
    await this.closeMongodb()
    setTimeout(async () => {
      await super.tearDown()
    }, 1000)
  }

  async init () {
    await this.initMongodb()
    await this.initRedis()
    await super.init()
  }
}

module.exports = Buffs
