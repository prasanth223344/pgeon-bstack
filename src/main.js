// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout: 3000})
// import Message from 'vue-m-message'

// Vue.use(Message) // will mount `Vue.prototype.$message`


import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

// set default config
VueCookies.config('7d')

 
window.blockstack = require('blockstack')
window.axios = require('axios');



Vue.config.productionTip = false

Vue.component('allqtimer', require('./components/AllQTimer.vue'));



Vue.prototype.RADIKS_SERVER =  { apiServer: process.env.RADIKS_SERVER}
//Vue.prototype.FB =  

import { UserSession, AppConfig } from "blockstack";
import { configure } from "radiks";


import { BlockstackMixin } from "./mixins/BlockstackMixin.js";

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
  mixins: [BlockstackMixin],

  created: function () {

      if(this.current_user) {
        socket.emit('connect_me', 'U_'+this.current_user.username);
      }


    this.userSession = new UserSession({
      appConfig: new AppConfig(["store_write", "publish_data"])
    });

    configure({
      apiServer: this.RADIKS_SERVER,
      userSession: this.userSession
    });
    




  }
})

