'use strict'

const { postSuccess, putSuccess } = require('./payloads')

const post = async (tap, suite, success) => {
  const { statusCode, payload } = await suite.post(success)
  tap.equal(200, statusCode, payload)

  tap.assert(!!payload._id, 'POST [ok], !!payload._id')

  return payload
}

const put = async (tap, suite, id, success) => {
  const { statusCode, payload } = await suite.put(id, success)
  tap.equal(200, statusCode, payload)

  delete payload._id
  delete success._id

  tap.strictSame(success, payload, 'PUT [ok], object, success (from json) === payload (from PUT db)')

  return { payload }
}

const get = async (tap, suite, id, success) => {
  const { statusCode, payload } = await suite.get(id)
  tap.equal(200, statusCode, payload)

  delete payload._id

  tap.strictSame(success, payload, 'PUT [ok], object, success (from json) === payload (from GET db)')
}

module.exports = async (suite) => {
  const { tap } = suite
  tap.test('=============================== PUT ===============================', async tap => {
    const payload = await post(tap, suite, postSuccess)
    const { _id } = payload
    await put(tap, suite, _id, putSuccess)

    await get(tap, suite, _id, putSuccess)

    await suite.delete_(_id)

    tap.end()
  })
}
