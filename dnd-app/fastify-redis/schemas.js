module.exports.configs = {
  type: 'object',
  required: ['REDIS'],
  properties: {
    REDIS: { type: 'string' }
  },
  additionalProperties: false
}
