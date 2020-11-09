module.exports.configs = {
  type: 'object',
  required: ['MONGODB'],
  properties: {
    MONGODB: { type: 'string' }
  },
  additionalProperties: false
}
