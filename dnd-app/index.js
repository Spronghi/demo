'use strict'
/*
 * This is the core of the project. 
 * It initializes swagger, it registers the modules and checks if the dependencies are all met.
 */
const { name: title, description, version } = require('./package.json')
const fp = require('fastify-plugin')
const requirements = require('./requirements')

function init (fastify, options) {
  const { requirements } = options
  const configs = { requirements: new Set(), modules: [] }
  for (const requirement of requirements) {
    require(`${requirement}/dependencies`).forEach(mod => configs.requirements.add(mod))
    configs.modules.push(requirement)
  }
  for (const requirement of configs.requirements) {
    fastify.register(fp(require(requirement)))
  }
  for (const module_ of configs.modules) {
    fastify.register(require(module_), require(`${module_}/configs`))
  }
}

module.exports = async (fastify, options) => {
  options = Object.assign({ requirements }, options)
  fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    swagger: {
      info: { title: `${title} ${process.env.NODE_ENV}`, description, version },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      exposeRoute: true
    }
  })
  fastify.addHook('preHandler', async ({ log, params, body, query }) => {
    log.debug({ params, body, query })
  })

  init(fastify, options)

  fastify.addHook('onRoute', ({ url, schema, method, prefix }) => {
    console.log({ url, method, prefix })
  })

  fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
  })

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  fastify.register(require('fastify-cors'), {
    origin: true
  })
}
