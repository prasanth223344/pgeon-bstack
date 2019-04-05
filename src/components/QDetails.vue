<template>
  <div>
       
       <answers-live-owner v-if="question_status=='ownlive'" v-bind:question="question.attrs"></answers-live-owner>
       <answers v-if="question_status=='answers'"  v-bind:question="question.attrs"></answers>


  </div>
</template>

<script>

import { configure } from "radiks";
import Question from "../models/Question";
import { User } from "radiks";
import Avatar from "vue-avatar";
import AnswersLiveOwner from './AnswersLiveOwner.vue'
import Answers from './Answers.vue'
import moment from 'moment';



import { CommonMixin } from "../mixins/CommonMixin.js";

export default {
  data: function() {
    return {

      id: null,
      blockstack: window.blockstack,
      user: null,
      question: null,
      question_status: null,
    };
  },

  components: {},

  mixins: [CommonMixin],

  methods: {
    

  

 
  },

  async mounted() {

   configure(this.RADIKS_SERVER);

   this.id = this.$route.params.id
   this.user = await User.currentUser();
 
    await Question.findById(this.id);
    this.question = await Question.findById(this.id);

   
   if (this.question.attrs.user_id == this.user.attrs._id) {
     if(this.question.attrs.expiring_at > moment().unix()) {
        this.question_status = 'ownlive';
     }else {
       this.question_status = 'ownexpired';
     }
     
   }else {
     this.question_status = 'answers';
   }


    
   
   
  },
  components: {
    Avatar,  AnswersLiveOwner, Answers
  }
};
</script>
