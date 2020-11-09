export default {
  SET_AUTH (state, auth) {
    state.auth = auth
  },
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}
