'use strict'

/*
 * This module exports the JSON schema used by this service.
 * It specify the model used by the API and so on.
 * You will find duplicated schemas between services, that's because
 * I didn't want to make a repository or an npm module published on an npm
 * registry just for the schemas, because it's hard to mantein. I prefered
 * to mantein things most simple as possible.
 */
const properties = {
  _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
  name: { type: 'string' },
  age: { type: 'number' },
  level: { type: 'number' },
  sex: { type: 'string' },
  languages: {
    type: 'array',
    items: { type: 'string' },
    default: []
  },
  hitPoint: { type: 'number' },
  stat: { type: 'number' },
  skill: {
    type: 'object',
    properties: {
      value: { type: 'number' },
      name: { type: 'string' },
      mod: { type: 'string' },
      repeat: { type: 'boolean', default: false },
      untrained: { type: 'boolean', default: false },
      trained: { type: 'boolean', default: true },
      armorPenality: { type: 'boolean', default: false },
      combact: { type: 'boolean', default: false }
    },
    additionalProperties: false
  }
}

const params = {
  type: 'object',
  required: ['id'],
  properties: {
    id: properties._id
  },
  additionalProperties: false
}

const model = {
  type: 'object',
  required: ['_id', 'name'],
  properties: {
    _id: properties._id,
    name: properties.name,
    level: properties.level,
    age: properties.age,
    sex: properties.sex,
    languages: properties.languages,
    hitPoint: properties.hitPoint,
    skills: {
      type: 'array',
      items: properties.skill,
      default: []
    },
    stats: {
      type: 'object',
      properties: {
        str: properties.stat,
        dex: properties.stat,
        con: properties.stat,
        int: properties.stat,
        wis: properties.stat,
        cha: properties.stat
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
}

const post = (properties => {
  return {
    type: 'object',
    required: model.required.filter(r => r !== '_id'),
    properties,
    additionalProperties: false
  }
})({ ...model.properties })

const put = (post => {
  delete post.properties._id
  return post
})(post)

module.exports.put = {
  params,
  body: put,
  response: {
    200: model
  }
}

module.exports.patch = {
  params,
  body: put,
  response: {
    200: model
  }
}

module.exports.post = {
  body: post,
  response: {
    200: model
  }
}

module.exports.delete_ = {
  params,
  response: {
    200: model
  }
}

module.exports.get = {
  params,
  response: {
    200: model
  }
}

module.exports.getAll = {
  response: {
    200: {
      type: 'array',
      items: model
    }
  }
}
