const cookieparser = process.server ? require('cookieparser') : undefined

export default {
  nuxtServerInit ({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        console.log(err);
      }
    }
    commit('SET_AUTH', auth)
  }
}
