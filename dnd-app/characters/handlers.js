/*
 * The module that exports the handlers of the routes.
 * Here goes the error handling and the service calls. It's also usefull for
 * calling Redis, maybe you want to publish an event every time a character is created,
 * so another service could subscribe to that event and can do something with that
 * character.
 */
const {
  NotFound,
  InternalServerError
  /*, Forbidden */
} = require('http-errors')

module.exports.get = async function get (request, reply) {
  const payload = await request.charactersService.get(request.params.id)
  if (!payload) throw new NotFound()
  return payload
}

module.exports.getAll = async function getAll (request, reply) {
  return request.charactersService.getAll(request.query)
}

module.exports.delete_ = async function delete_ (request, reply) {
  const payload = await request.charactersService.get(request.params.id)
  if (!payload) throw new NotFound()
  const { deletedCount } = await request.charactersService.delete_(request.params.id)
  if (!deletedCount) throw new InternalServerError()
  return payload
}

module.exports.post = async function post (request, reply) {
  const payload = await request.charactersService.post(request.body)
  if (!payload) throw new NotFound()
  return payload
}

module.exports.put = async function put (request, reply) {
  const payload = await request.charactersService.put(request.params.id, request.body)
  if (!payload) throw new NotFound()
  return payload
}
