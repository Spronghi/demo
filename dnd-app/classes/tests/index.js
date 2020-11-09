'use strict'

const tap = require('tap')
const Suite = require('./suite')
const post = require('./post')
const put = require('./put')
const delete_ = require('./delete')

tap.test('BUFFS', async tap => {
  const suite = new Suite(tap)
  await suite.init()

  await post(suite)
  await put(suite)
  await delete_(suite)

  tap.tearDown(async () => suite.tearDown())
})
