'use strict'

const { postSuccess } = require('./payloads')

const post = async (tap, suite, success) => {
  const { statusCode, payload } = await suite.post(success)
  tap.equal(200, statusCode, payload)

  tap.assert(!!payload._id, 'POST [ok], !!payload._id')

  return payload
}

const get = async (tap, suite, id, success) => {
  const { statusCode, payload } = await suite.get(id)
  tap.equal(200, statusCode, payload)

  delete payload._id
  tap.strictSame(success, payload, 'POST [ok], object, success (from json) === payload (from db)')
}

module.exports = async (suite) => {
  const { tap } = suite
  tap.test('POST', async tap => {
    const { _id } = await post(tap, suite, postSuccess)
    await get(tap, suite, _id, postSuccess)
    await suite.delete_(_id)
    tap.end()
  })
}
