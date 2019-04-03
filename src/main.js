// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
 
window.blockstack = require('blockstack')
window.axios = require('axios');
window.axios.defaults.baseURL = process.env.API_PATH;


Vue.config.productionTip = false

Vue.component('allqtimer', require('./components/AllQTimer.vue'));



Vue.prototype.RADIKS_SERVER =  { apiServer: process.env.RADIKS_SERVER}
//Vue.prototype.FB =  

import { UserSession, AppConfig } from "blockstack";
import { configure } from "radiks";






/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data: {
    userSession: 'wat',
  },
  created: function () {

    
    // console.log('wat');


    this.userSession = new UserSession({
      appConfig: new AppConfig(["store_write", "publish_data"])
    });

    configure({
      apiServer: this.RADIKS_SERVER,
      userSession: this.userSession
    });
    
  }
})

