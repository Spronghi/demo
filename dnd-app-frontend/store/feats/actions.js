export default {
  async loadFeats({ commit }) {
    const { data } = await this.$axios.get('/api/feats')
    commit('SET_FEATS', data)
  },

  async getFeat({ commit }, id) {
    const { data } = await this.$axios.get(`/api/feats/${id}`)
    commit('SET_FEAT', data)
  }
}
