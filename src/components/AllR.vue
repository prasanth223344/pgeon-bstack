<template>
  <div>
    <headerhome></headerhome>

    <main class="landing-main mw6 m-auto pl15 pr15" v-if="questions.length < 1">
      <div class="container text-center m-t-5p">
        <div v-if="!still_deciding_count"></div>
        <div v-else>
          <div class="empty-notifications">
            <p class="m0">
              <span>💬</span>
              <span>There are currently no
                <br>questions to display
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>

    <main class="landing-main mw6 m-auto pl15 pr15">
      <div class="p-b-15" v-for="(user_qs) in questions">
        <div class="open-question__container" v-for="(question,index) in user_qs.q_obj">





  <div class="open-question__left">
          <router-link :to="{ name: 'profile', params: { id:  user_qs.user_id}}" >
              <avatar :size="42" :src="user_qs.profile_pic" :username="user_qs.user_id"></avatar>
           </router-link>
        </div>
        <div class="open-question__right">
          <span class="open-question__meta">
						    <router-link class="open-question__author" :to="{ name: 'friendship', params: { q_by: question.q.attrs.user_id, a_by: all_answers[question.q.attrs.accepted_answer].user_id }}" >{{question.q.attrs.user_id}} ← {{all_answers[question.q.attrs.accepted_answer].user_id}}</router-link>
            <span class="open-question__time">{{ago(question.q.attrs.expiring_at)}}</span>
          </span>
        <div class="q-bubble-container q-bubble-container--clickable mt5p">
        <div class="q-bubble qa-item ">
          <div>
            <span> {{question.q.attrs.question}}</span>
          </div>
          <div class="qa-item__seperator"></div>
          <span> {{all_answers[question.q.attrs.accepted_answer].answer}}</span>
          </div>
          </div>
        </div>




       
          
        </div>
      </div>

      <ul class="load_more" v-if="still_deciding_count">
        <li>
          <div class="spinner p-rel">
            <div class="b1 se"></div>
            <div class="b2 se"></div>
            <div class="b3 se"></div>
            <div class="b4 se"></div>
            <div class="b5 se"></div>
            <div class="b6 se"></div>
            <div class="b7 se"></div>
            <div class="b8 se"></div>
            <div class="b9 se"></div>
            <div class="b10 se"></div>
            <div class="b11 se"></div>
            <div class="b12 se"></div>
          </div>
        </li>
      </ul>

      <div class="FAB-button__container mw6 m-auto">

          <router-link :to="{ path: 'my-questions'  }"  class="FAB-button" v-if="current_user">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M436 238H242V44c0-6.6-5.4-12-12-12h-12c-6.6 0-12 5.4-12 12v194H12c-6.6 0-12 5.4-12 12v12c0 6.6 5.4 12 12 12h194v194c0 6.6 5.4 12 12 12h12c6.6 0 12-5.4 12-12V274h194c6.6 0 12-5.4 12-12v-12c0-6.6-5.4-12-12-12z"
            ></path>
          </svg>
</router-link>

        
      </div>
    </main>
  </div>
</template>

<script>

import { configure } from "radiks";
import Question from "../models/Question";
import { User } from "radiks";
import Avatar from "vue-avatar";
import Headerhome from './shared/HeaderHome.vue'
import moment from 'moment';

import Answer from "../models/Answer";

//Vue.component('headerwithprofile', require('./components/shared/HeaderWithProfile.vue'));


import { CommonMixin } from "../mixins/CommonMixin.js";
import { BlockstackMixin } from "../mixins/BlockstackMixin.js";


export default {
  data: function() {
    return {
      questions: [],
      all_answers: [],
			records_loaded: false,
			      still_deciding_count: true,

    };
  },

  components: {},

  mixins: [CommonMixin, BlockstackMixin],

  methods: {
    handleScroll: function() {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        //if scroll hits bottom
        if (
          $(window).scrollTop() + $(window).height() >
          $(document).height() - 100
        ) {
          this.get_paginated_results();
        }
      }
    },
    reset: function() {
      this.questions = {};
      this.current_page = 0;
      this.currently_fetched_records_count = 0;
      //questions.length will be zero but not finalized yet until push to array
      this.still_deciding_count = true;
      $(".up50").removeClass("up50") && $(".up0").removeClass("up0");
    },

    followed_questions: function() {
      this.reset();
      this.get_paginated_qff();
    },

    /** will be called only from onclick..so to reset everything**/
    featured_questions: function() {
      this.reset();
      this.current_filter = "everyone";
      this.get_paginated_qff();
    },
    redirect: function(id) {
      location.href = "question/" + id;
    },

    ago(ms) {
      
return moment.unix(ms).fromNow()
    },
    //will be called from timer comp
    deleteQ: function(id) {
      let i = 0;
      while (i < this.questions.length) {
        if (this.questions[i]["id"] == id) {
          this.questions.splice(i, 1);
        }
        i++;
      }
    },



    loadQs: async function() {
      $(".up50").removeClass("up50");
      $(window).bind("scroll", this.handleScroll);

      configure(this.RADIKS_SERVER);
      var qs =  await Question.fetchList({
        expiring_at: { $lt: moment().unix() },
         accepted_answer: { $exists: true } 
      });

      var user_qs = [];
			var a_ids = new Array();

      	qs.forEach(q => {

        // console.log(q[i].attrs);
        if (!user_qs[q.attrs.user_id]) {
          //will be fetched later
          // this.profile_pics[q.attrs.user_id] = {pic: null}
          user_qs[q.attrs.user_id] = [];
        }

				user_qs[q.attrs.user_id].push({ q });
				a_ids.push(q.attrs.accepted_answer)
			});
			 //  this will be converted to $in array based on query-to-mongo
      var answers = await Answer.fetchList({ _id: a_ids.join(",") });

      answers.forEach(a => {
        this.all_answers[a._id] = a.attrs;
			});
			


      var formatted_qs = [];
      for (var key in user_qs) {
        //profile_pic will be fetched later
        formatted_qs.push({
          user_id: key,
          q_obj: user_qs[key],
          profile_pic: null
        });
      }

      this.questions = formatted_qs;



      this.still_deciding_count = false;

      $(".spinner").remove();

      this.still_deciding_paging = false;
      this.currently_fetched_records_count = 0;

      if (qs.length > 0) {
        //this.questions.push(...response)
        this.loading_txt = "more";
      } else {
        this.still_deciding_count = false;
      }


      //(a => );



     

			this.questions.forEach(o => this.loadProfilePic(o.user_id, this.questions));
			this.records_loaded = true
    }
  },

  mounted() {
    this.loadQs();
    //if this is empty even after .push?
    //  if (this.questions.length < 1) {
    //      this.still_deciding_count = false
    //  }
  },
  components: {
    Avatar, Headerhome
  }
};
</script>
