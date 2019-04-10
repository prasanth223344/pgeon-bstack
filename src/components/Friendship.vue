<template>
  <div>
<header class="landing_header relative">
  <div class="mw6 m-auto landing_header__inner flex items-center top__header relative pr15 pl15">
     



          <a v-on:click="goBack()"  class="question-details__close pointer">

<img width="22" height="22" src="../assets/img/svg/long-arrow-left.svg">

                 </a> 
    


    <div class="question-details__profile response-images pointer">

      <avatar v-if="records_loaded" :size="36" :src="q_by_avatar" :username="$route.params.q_by"></avatar>
      <avatar v-if="records_loaded" :size="36" :src="a_by_avatar" :username="$route.params.a_by"></avatar>
                <!-- 

               <avatar src="{{ Helper::avatar($tuser->avatar) }}" :size=36 username="{{  Helper::name_or_slug($tuser) }}"></avatar>
              
                <avatar src="{{ Helper::avatar($fuser->avatar) }}" :size=36 username="{{  Helper::name_or_slug($fuser) }}"></avatar> -->

    </div>

    <div class="question-details__more pointer">
    </div>
  </div>

</header>
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

   
      <div class="open-question__container" v-if="records_loaded" v-for="question in questions">
        <div class="open-question__right response-details-bubble" v-on:click="toggleNameDisplay(question._id)">
          <div class="open-question__meta" v-bind:class="[toggle_class[question._id] ? 'expand' : 'shrunk']">
            <span class="open-question__author">{{$route.params.q_by}} ← {{$route.params.a_by}}</span>
            <span class="open-question__time">$reply->ago</span>
          </div>
        <div class="q-bubble-container q-bubble-container--clickable mt5p">

        <div class="q-bubble qa-item ">
            <div>
              <span>{{question.attrs.question}}</span>
            </div>
            <div class="qa-item__seperator"></div>
            <span>{{all_answers[question.attrs.accepted_answer].answer}}</span>
            </div>
          </div>
        </div>
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
import { NavMixin } from "../mixins/NavMixin.js";

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
            q_by_avatar: null,
            a_by_avatar: null,
            toggle_class:[]

    };
  },

  components: {},

  mixins: [CommonMixin, BlockstackMixin, NavMixin],

  methods: {

    toggleNameDisplay: function(qid) {
        if(!this.toggle_class[qid]){
          this.$set(this.toggle_class,qid,true )
        } else {
          this.$set(this.toggle_class,qid,false )
        }

      //console.log(this.toggle_class);
      
        
    },

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


      

        this.questions = await Question.fetchList({
         accepted_answer: { $exists: true } ,
        accepted_user: this.$route.params.a_by ,
        user_id: this.$route.params.q_by 
      });

      var a_ids = new Array();
      this.questions.forEach(a => a_ids.push(a.attrs.accepted_answer));



      //  this will be converted to $in array based on query-to-mongo
      var answers = await Answer.fetchList({ _id: a_ids.join(",") });

      answers.forEach(a => {
        this.all_answers[a._id] = a.attrs;
      });


      this.q_by_avatar = await this.loadIndivProfilePic(this.$route.params.q_by)
      this.a_by_avatar = await this.loadIndivProfilePic(this.$route.params.a_by)

      this.records_loaded = true
      

    }
  },

  async mounted() {
    configure(this.RADIKS_SERVER);

    this.loadQs();


   

    
  },
  components: {
    Avatar, Headerhome
  }
};
</script>
