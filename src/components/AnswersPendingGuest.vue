<template>
  <div>
    <headerforq v-bind:question="question" v-bind:noshare="noshare" v-bind:nomenu="nomenu"></headerforq>

    <main class="landing-main mw6 m-auto pl15 pr15 smtp mt15p">
      <div class="open-question__right">
        <div class="open-question__meta">
          <span>
            <router-link
              class="open-question__author"
              :to="{ name: 'profile', params: { id:  question.user_id}}"
            >{{question.user_id}}</router-link>
          </span>
          <span class="open-question__time">Ended: {{formatted}}</span>
        </div>

        <div class="q-bubble qa-item">
          <div>
            <span>{{question.question}}</span>
          </div>
          <div class="qa-item__seperator"></div>
          <span></span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
var longpress;
var pressTimer;
import Headerforq from "./shared/HeaderForQ.vue";
import Question from "../models/Question";
import { BlockstackMixin } from "../mixins/BlockstackMixin.js";

import moment from "moment";

export default {
  data: function() {
    return {
      records_loaded: false,
      formatted: null,
      nomenu: false,
              noshare:true,

    };
  },
  //votecount will be inc'ted or dec'ted when the user cast a vote..but accurate vote can be viewed only on page refresh
  props: ["question"],
        mixins: [BlockstackMixin],

  mounted() {},

  watch: {},
  methods: {
    clearError() {
      this.submit_error = false;
    },

    scrollToEnd: function() {
      var container = this.$el;

      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  },

  created: async function() {
    var com = this;

    this.formatted = moment
      .unix(this.question.expiring_at)
      .format("MM/DD/YYYY");

      
  
    this.records_loaded = true;
  },

  components: {
    Headerforq
  }
};
</script>
