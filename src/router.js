import Vue from 'vue'
import Router from 'vue-router'
import allq from './components/AllQ.vue';
import ask from './components/Ask.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'allq',
      component: allq
    },
    {
      path: '/my-questions',
      name: 'ask',
      component: ask
    },
   
  ]
})
