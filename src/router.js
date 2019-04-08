import Vue from 'vue'
import Router from 'vue-router'
import allq from './components/AllQ.vue';
import ask from './components/Ask.vue';
import people from './components/Follow.vue';
import search from './components/Search.vue';
import qdetails from './components/QDetails.vue';
import live from './components/Live.vue';
import pending from './components/Pending.vue';
import viewpanswers from './components/ViewAllPendingAnswers.vue';


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
    {
      path: '/question/:id',
      name: 'qdetails',
      component: qdetails
    },
    {
      path: '/people',
      name: 'people',
      component: people
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/live',
      name: 'live',
      component: live
    },
    {
      path: '/pending',
      name: 'pending',
      component: pending
    },
    {
      path: '/pending/:qid/:top_a',
      name: 'viewpanswers',
      component: viewpanswers
    },

  ]
})
