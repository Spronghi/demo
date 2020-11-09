'use strict'

const { ObjectId } = require('mongodb')

class Service {
  constructor (collection) {
    this.collection = collection
  }

  async get (id) {
    return this.collection.findOne({ _id: ObjectId(id) })
  }

  async post (entity) {
    entity.created = this.now()
    const { insertedId } = await this.collection.insertOne(entity)
    entity._id = insertedId
    return entity
  }

  async put (id, entity) {
    entity.updated = this.now()
    await this.collection.updateOne({ _id: ObjectId(id) }, { $set: entity }, { upsert: true })
    entity._id = id
    return entity
  }

  async delete_ (id) {
    const { deletedCount } = await this.collection.removeOne({ _id: ObjectId(id) })
    return { deletedCount, id }
  }

  async getAll (querystring) {
    return this.collection.find(querystring).toArray()
  }

  async ensureIndexes () {
    return this.collection.createIndex({ name: 1 })
  }

  now () { return new Date() }
}

module.exports = Service
