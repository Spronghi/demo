'use strict'

const properties = {
  _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
  name: { type: 'string' },
  description: { type: 'string' },
  target: { type: 'string' },
  type: { type: 'string' },
  value: { type: ['number'] },
  formula: { type: 'string' },
  proficiency: { type: 'string' }
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

const choice = {
  type: 'object',
  required: ['name', 'type'],
  properties: {
    _id: properties._id,
    name: properties.name,
    type: properties.type,
    description: properties.description,
    effects: {
      type: 'array',
      items: effect,
      default: []
    },
    or: {
      type: 'array',
      items: properties.name,
      default: []
    }
  },
  additionalProperties: false
}

const level = {
  type: 'object',
  properties: {
    value: properties.value,
    bab: properties.value,
    fort: properties.value,
    ref: properties.value,
    will: properties.value,
    choises: {
      type: 'array',
      items: choice,
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
const skill = {
  type: 'object',
  properties: {
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

const model = {
  type: 'object',
  required: ['_id', 'name', 'description'],
  properties: {
    _id: properties._id,
    name: properties.name,
    description: properties.description,
    hitDie: properties.value,
    skillPoints: properties.value,
    proficiency: {
      type: 'array',
      items: properties.proficiency,
      default: []
    },
    skills: {
      type: 'array',
      items: skill,
      default: []
    },
    characters: {
      type: 'array',
      items: properties._id,
      default: []
    },
    levels: {
      type: 'array',
      items: level,
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
