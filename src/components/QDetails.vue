<template>
  <div>
    <answers-live-owner v-if="question_status=='ownlive'" v-bind:question="question.attrs"></answers-live-owner>
    <answers v-if="question_status=='answers'" v-bind:question="question.attrs"></answers>
    <answers-published v-if="question_status=='publised'" v-bind:question="question.attrs"></answers-published>
    <answers-pending v-if="question_status=='answerspending'" v-bind:question="question.attrs"></answers-pending>
  </div>
</template>

<script>
import { configure } from "radiks";
import Question from "../models/Question";
import { User } from "radiks";
import Avatar from "vue-avatar";
import AnswersLiveOwner from "./AnswersLiveOwner.vue";
import Answers from "./Answers.vue";
import AnswersPublished from "./AnswersPublished.vue";
import AnswersPending from "./AnswersPending.vue";
import moment from "moment";

import { CommonMixin } from "../mixins/CommonMixin.js";
import { BlockstackMixin } from "../mixins/BlockstackMixin.js";


export default {
  data: function() {
    return {
      id: null,
      blockstack: window.blockstack,
      user: null,
      question: null,
      question_status: null
    };
  },

  components: {},

  mixins: [CommonMixin, BlockstackMixin],

  methods: {},

  async mounted() {
    configure(this.RADIKS_SERVER);

    this.id = this.$route.params.id;
    this.user = await User.currentUser();

    this.question = await Question.findById(this.id);

    if (
      this.question.attrs.expiring_at > moment().unix() &&
      this.question.attrs.user_id == this.user.attrs._id
    ) {
      this.question_status = "ownlive";
    } else if (
      this.question.attrs.expiring_at > moment().unix() &&
      this.question.attrs.user_id != this.user.attrs._id
    ) {
      this.question_status = "answers";
       if(!this.$cookies.get(`hits_${this.question._id}`)) {
         
         var hits = 0
         if(this.question.attrs.hits) {
            hits = parseInt(this.question.attrs.hits) 
         }
          this.question.update({hits: hits + 1 });
         await this.question.save()

        this.$cookies.set(`hits_${this.question._id}`, true);

      }else {
        
      }
        

    } else if (
      this.question.attrs.accepted_answer &&
      this.question.attrs.accepted_user &&
      this.question.attrs.expiring_at < moment().unix()
    ) {
      this.question_status = "publised";
    } else if (
      !this.question.attrs.accepted_answer &&
      this.question.attrs.expiring_at < moment().unix()
    ) {
      this.question_status = "answerspending";
    }

  },
  components: {
    Avatar,
    AnswersLiveOwner,
    Answers,
    AnswersPublished,
    AnswersPending
  }
};
</script>
