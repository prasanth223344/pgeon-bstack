<template>
  <div>
    <headerwithprofile></headerwithprofile>
       

       <answers-live-owner v-if="question_status=='ownlive'" question="question"></answers-live-owner>

  </div>
</template>

<script>

import { configure } from "radiks";
import Question from "../models/Question";
import { User } from "radiks";
import Avatar from "vue-avatar";
import Headerwithprofile from './shared/HeaderWithProfile.vue'
import AnswersLiveOwner from './AnswersLiveOwner.vue'
//Vue.component('headerwithprofile', require('./components/shared/HeaderWithProfile.vue'));


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
    

    loadProfilePic: async function(user_id) {
      var pf = await this.blockstack.lookupProfile(user_id);
      this.questions
        .filter(o => o.user_id === user_id)
        .forEach(o => {
          if (
            pf &&
            typeof pf.image !== "undefined" &&
            pf.image[0]["contentUrl"]
          ) {
            o.profile_pic = pf.image[0]["contentUrl"];
          }

          console.log("wat");
        });
    },

 
  },

  async mounted() {

   this.id = this.$route.params.id
   this.user = await User.currentUser();
   this.question = await Question.findById(this.id);

   //console.log(this.question);
   //console.log(this.user);
    
   if (this.question.attrs.user_id == this.user.attrs._id) {
     this.question_status = 'ownlive';
   }


    
   
   
  },
  components: {
    Avatar, Headerwithprofile, AnswersLiveOwner
  }
};
</script>
