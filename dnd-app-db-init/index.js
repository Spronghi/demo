const axios = require('./axios')

const eldor = require('./eldor/character.json')
const clazz = require('./eldor/class.json')
const feats = require('./eldor/feats.json')

;(async () => {

  try {
    const { data: characters } = await axios.get('/api/characters')

    if (characters && characters.length) return console.log('No pushing data on DB beacause it\'s not empty')
  } catch(error) {
    return console.log(error)
  }

  try {
    const { data: character } = await axios.post('/api/characters', eldor)
    
    const { _id } = character
    
    axios.post('/api/classes', { ...clazz, characters: [ _id ] })

    feats.forEach(feat => axios.post('/api/feats', { ...feat, characters: [ _id ] }))    
  } catch (error) {
    console.log(error)
  }
})()
