'use strict'

const { postSuccess } = require('./payloads')

const post = async (tap, suite, success) => {
  const { statusCode, payload } = await suite.post(success)
  tap.equal(200, statusCode, payload)

  tap.assert(!!payload._id, 'POST [ok], !!payload._id')

  return payload
}

module.exports = async (suite) => {
  const { tap } = suite
  const payload = await post(tap, suite, postSuccess)
  tap.test('=============================== DELETE TEST ===============================', async tap => {
    const deleted = await suite.delete_(payload._id)
    tap.assert(deleted, 'DELETE [ok], element deleted')
    const { statusCode } = await suite.get(payload._id)
    tap.assert(statusCode >= 400, statusCode)
    tap.end()
  })
}
