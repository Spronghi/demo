const {
  NotFound,
  InternalServerError
  /*, Forbidden */
} = require('http-errors')

module.exports.get = async function get (request, reply) {
  const payload = await request.featsService.get(request.params.id)
  if (!payload) throw new NotFound()
  return payload
}

module.exports.getAll = async function getAll (request, reply) {
  return request.featsService.getAll(request.query)
}

module.exports.delete_ = async function delete_ (request, reply) {
  const payload = await request.featsService.get(request.params.id)
  if (!payload) throw new NotFound()
  const { deletedCount } = await request.featsService.delete_(request.params.id)
  if (!deletedCount) throw new InternalServerError()
  return payload
}

module.exports.post = async function post (request, reply) {
  const payload = await request.featsService.post(request.body)
  if (!payload) throw new NotFound()
  return payload
}

module.exports.put = async function put (request, reply) {
  const payload = await request.featsService.put(request.params.id, request.body)
  if (!payload) throw new NotFound()
  return payload
}
