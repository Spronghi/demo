export default {
  async loadClasses({ commit }) {
    const { data } = await this.$axios.get('/api/classes')
    commit('SET_CLASSES', data)
  },

  async loadClass({ commit }, id) {
    const { data } = await this.$axios.get(`/api/classes/${id}`)
    data.levels.sort((a, b) => a.value > b.value ? 1 : -1)
    commit('SET_CLASS', data)
  }
}
