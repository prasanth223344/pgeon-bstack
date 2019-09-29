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
          <span class="open-question__time"><answeringtimer :initial="parseInt(question.expiring_at)"></answeringtimer></span>
        </div>

        <div class="q-bubble qa-item">
          <div>
            <span>{{question.question}}</span>
          </div>
                </div>
                </div>

           <div class="open-question__seperator mt15p mb15p">
      <div class="open-question__seperator__inner mr15p"></div>
      <div class="open-question__seen mr15p">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M569.354 231.631C512.969 135.948 407.808 72 288 72 168.14 72 63.004 135.994 6.646 231.63a47.999 47.999 0 0 0 0 48.739C63.032 376.053 168.192 440 288 440c119.86 0 224.996-63.994 281.354-159.631a48.002 48.002 0 0 0 0-48.738zM416 228c0 68.483-57.308 124-128 124s-128-55.517-128-124 57.308-124 128-124 128 55.517 128 124zm125.784 36.123C489.837 352.277 393.865 408 288 408c-106.291 0-202.061-56.105-253.784-143.876a16.006 16.006 0 0 1 0-16.247c29.072-49.333 73.341-90.435 127.66-115.887C140.845 158.191 128 191.568 128 228c0 85.818 71.221 156 160 156 88.77 0 160-70.178 160-156 0-36.411-12.833-69.794-33.875-96.01 53.76 25.189 98.274 66.021 127.66 115.887a16.006 16.006 0 0 1-.001 16.246zM224 224c0-10.897 2.727-21.156 7.53-30.137v.02c0 14.554 11.799 26.353 26.353 26.353 14.554 0 26.353-11.799 26.353-26.353s-11.799-26.353-26.353-26.353h-.02c8.981-4.803 19.24-7.53 30.137-7.53 35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64z"></path></svg>
          <span>  {{(question.hits)?question.hits:0}}  </span>
      </div>
      <div class="open-question__comments mr15p">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 64c123.5 0 224 79 224 176S379.5 416 256 416c-28.3 0-56.3-4.3-83.2-12.8l-15.2-4.8-13 9.2c-23 16.3-58.5 35.3-102.6 39.6 12-15.1 29.8-40.4 40.8-69.6l7.1-18.7-13.7-14.6C47.3 313.7 32 277.6 32 240c0-97 100.5-176 224-176m0-32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26 3.8 8.8 12.4 14.5 22 14.5 61.5 0 110-25.7 139.1-46.3 29 9.1 60.2 14.3 93 14.3 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path></svg>
          <span>{{answers.length}} </span>
      </div>
      <div class="open-question__votes">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 32c8.823 0 16 7.178 16 16v352c0 8.822-7.177 16-16 16H48c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h352m-34.301 98.293l-8.451-8.52c-4.667-4.705-12.265-4.736-16.97-.068l-163.441 162.13-68.976-69.533c-4.667-4.705-12.265-4.736-16.97-.068l-8.52 8.451c-4.705 4.667-4.736 12.265-.068 16.97l85.878 86.572c4.667 4.705 12.265 4.736 16.97.068l180.48-179.032c4.704-4.667 4.735-12.265.068-16.97z"></path></svg>
          <span> {{vote_count}} </span>
      </div>
    </div>
          <span></span>
          

          
        <div class="open-question__no-responses" v-if="records_loaded && answers.length<1"></div>

        <div v-else>
          <div
            v-for="(answer, index) in answers"
            v-bind:key="answer.attrs._id"
          >
            <v-touch
              v-bind:class="['open-question__response  jsvote '] "
            >
              <p>{{answer.attrs.answer}}</p>

              <span
                id="vote"
                class="voting_container vote-none"
              
              >
                <!-- <img src="/assets/img/sprites/solid.svg" /> -->

                <svg class="caret-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path
                    d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
                  ></path>
                </svg>

                <!-- <svg width="12" height="12" class="c-up">
                <use
                  class="caret-up"
                  xlink:href="/assets/img/sprites/solid.svg#caret-up"
                ></use>
                </svg>-->

                <span></span>
                <div
                  class="v_count"
                  
                >{{(votes_for_answers[answer.attrs._id])?votes_for_answers[answer.attrs._id]:0 }}</div>
                <svg class="caret-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path
                    d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
                  ></path>
                </svg>

                <!-- <svg width="12" height="12" class="c-down">
                <use
                  v-bind:class="{ 'vote-down': checkVoted(answer.attrs._id) == -1 }"
                  class="caret-down"
                  xlink:href="caretdown"
                ></use>
                </svg>-->
              </span>
            </v-touch>
          </div>
        </div>

      
    </main>

                      <router-link class="base-btn guest-login mw6 m-auto" :to="{ name: 'login'}" >

      Login / Signup
    </router-link> 
  </div>
</template>

<script>
var longpress;
var pressTimer;
import Answeringtimer from './AnsweringTimer.vue'
import Answer from "../models/Answer";
import Vote from "../models/Vote";
import Headerforq from "./shared/HeaderForQ.vue";
import Question from "../models/Question";
import { BlockstackMixin } from "../mixins/BlockstackMixin.js";

import moment from "moment";

export default {
  data: function() {
    return {
              answers: [],

      records_loaded: false,
      formatted: null,
          vote_count: 0,
 votes_for_answers: [],
      nomenu: false,

              noshare:false,

    };
  },
  //votecount will be inc'ted or dec'ted when the user cast a vote..but accurate vote can be viewed only on page refresh
  props: ["question"],
        mixins: [BlockstackMixin],

  mounted() {},

  watch: {},
  methods: {
  
    scrollToEnd: function() {
      var container = this.$el;

      container.scrollTop = container.scrollHeight - container.clientHeight;
    }
  },

  created: async function() {
    var com = this;

    this.answers = await Answer.fetchList(
        { question_id: this.question._id },
        { decrypt: false }
      );



      this.votes_count = await Vote.fetchList(
        { question_id: this.question._id },
        { decrypt: false }
      );

       for (var i = 0; i < this.votes_count.length; i++) {
        var vote = this.votes_count[i];
        if (!this.votes_for_answers[vote.attrs.answer_id]) {


          this.votes_for_answers[vote.attrs.answer_id] = 0;
        }
        this.votes_for_answers[vote.attrs.answer_id] += parseInt(
          vote.attrs.vote
        );
      }

    this.records_loaded = true;
    
    this.$cookies.set('redirect_to', this.$route.fullPath);

  },

  components: {
    Headerforq,
    Answeringtimer
  }
};
</script>
