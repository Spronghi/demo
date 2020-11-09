import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import characters from './characters'
import feats from './feats'
import rules from './rules'
import classes from './classes'

export default {
  state:() => ({
    auth: null,
    locales: ['en', 'it'],
    locale: 'en'
  }),
  modules: {
    feats,
    characters,
    rules,
    classes
  },
  ...mutations,
  ...actions,
  ...getters
}