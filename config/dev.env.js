var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  RADIKS_SERVER:  "'http://localhost:1260'",
  API_PATH: "'http://localhost:1260/api/'"


  
})
