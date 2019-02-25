// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

window.blockstack = require('blockstack')
window.axios = require('axios')

Vue.config.productionTip = false

console.log('mama');
console.log();


Vue.prototype.RADIKS_SERVER =  { apiServer: process.env.RADIKS_SERVER}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

