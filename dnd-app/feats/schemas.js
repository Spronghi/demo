'use strict'

const properties = {
  _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
  name: { type: 'string' },
  description: { type: 'string' },
  target: { type: 'string' },
  type: { type: 'string' },
  value: { type: ['number'] },
  formula: { type: 'string' }
}

const params = {
  type: 'object',
  required: ['id'],
  properties: {
    id: properties._id
  },
  additionalProperties: false
}

const querystring = {
  type: 'object',
  properties: {
    name: properties.name,
    characters: properties._id
  }
}

const effect = {
  type: 'object',
  properties: {
    target: properties.target,
    type: properties.type,
    value: properties.value,
    description: properties.description,
    formula: properties.formula,
    against: {
      type: 'array',
      items: properties.type,
      default: []
    },
    is: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['ability', 'increment']
      },
      default: []
    }
  },
  additionalProperties: false
}

const model = {
  type: 'object',
  required: ['_id', 'name', 'description'],
  properties: {
    _id: properties._id,
    name: properties.name,
    description: properties.description,
    characters: {
      type: 'array',
      items: properties._id,
      default: []
    },
    effects: {
      type: 'array',
      items: effect,
      default: []
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
  querystring,
  response: {
    200: {
      type: 'array',
      items: model
    }
  }
}
