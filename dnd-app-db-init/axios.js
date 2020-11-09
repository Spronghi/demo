const axios = require('axios')

module.exports = axios.create({
  baseURL: 'http://dnd-app:3000'
})