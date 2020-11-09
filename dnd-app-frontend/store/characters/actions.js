export default {
  async loadCharacters({ commit }) {
    try{
      const { data } = await this.$axios.get('/api/characters')
      commit('SET_CHARACTERS', data)  
    } catch(e){
      console.error(e);
    }
  },

  async getCharacter({ commit }, id) {
    try{
      const { data: character } = await this.$axios.get(`/api/characters/${id}`)
      const { data: feats } = await this.$axios.get('/api/feats', { params: {characters: character._id} })
      character.feats = feats || []
      character.skills.sort((a, b) => a.name > b.name ? 1 : -1)
      commit('SET_CHARACTER', character)
    } catch(e){
      console.error(e);
    }
  }
}
