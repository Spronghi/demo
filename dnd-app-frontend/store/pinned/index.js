
const mutations = {
  PUSH(state, { type, element, _id }){
      if(_id){
        element = Object.assign(element, {})
        element._id = _id
      }

      if(!state.pinned.find(el => el.pin._id === element._id)){
        element.pin = {
          pinned: true,
          type
        }

        state.opened += 1
        state.pinned.push(element)
      }
  },
  REMOVE(state, { type, _id }){
    if(state.pinned){
      let index = -1;
      state.pinned.find((el, i) => {
        if(el._id === _id && el.pin.type === type){
          index = i
          return true
        }
      })
      if(index !== -1){
        state.opened -= 1,
        state.pinned.splice(index, 1)
      }
    }
  }
}

export default {
  state: () => ({
    pinned: [],
    opened: 0,
    FEAT: 'feat',
    SKILLS: 'skills',
  }),
  mutations,
}
