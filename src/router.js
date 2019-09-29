import Vue from 'vue'
import Router from 'vue-router'
import allq from './components/AllQ.vue';
import allr from './components/AllR.vue';
import ask from './components/Ask.vue';
import people from './components/People.vue';
import search from './components/Search.vue';
import qdetails from './components/QDetails.vue';
import live from './components/Live.vue';
import pending from './components/Pending.vue';
import account from './components/Account.vue';
import preferences from './components/Preferences.vue';
import friendship from './components/Friendship.vue';
import published from './components/Published.vue';
import profile from './components/Profile.vue';
import notifications from './components/Notifications.vue';
import viewpanswers from './components/ViewAllPendingAnswers.vue';
import login from './components/Login.vue';


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'allr',
      component: allr
    },
    //no login warning will be given if it is redirected here
    {
      path: '/nl',
      name: 'nl',
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
      path: '/r/:q_by/:a_by',
      name: 'friendship',
      component: friendship
    },
    // {
    //   path: '/responses',
    //   name: 'responses',
    //   component: allr
    // }, 
     {
      path: '/questions',
      name: 'questions',
      component: allq
    },
    {
      path: '/published',
      name: 'published',
      component: published
    },
    {
      path: '/pending/:qid/:top_a',
      name: 'viewpanswers',
      component: viewpanswers
    },
    {
      path: '/u/:id',
      name: 'profile',
      component: profile
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: preferences
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: notifications
    },

  ]
})
