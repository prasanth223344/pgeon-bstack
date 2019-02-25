import Vue from 'vue'
import Router from 'vue-router'
import allqguest from './components/AllQGuest.vue';
import ask from './components/Ask.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'allqguest',
      component: allqguest
    },
    {
      path: '/my-questions',
      name: 'ask',
      component: ask
    },
   
  ]
})
