import actions from './actions'
import mutations from './mutations'

export default {
  state: () => ({
    characters: [],
    character: {}
  }),
  actions,
  mutations
}
