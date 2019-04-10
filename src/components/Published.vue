<template>
  <div>
    <header class="live-header">
      <div class="mw6 m-auto flex items-center pl15p justify-between top__header pl-15 pr15">
        <span class="back-arrow dib">
          <a v-on:click="goBack()" class="dib">
            <img width="22" height="22" src="../assets/img/svg/times.svg">
          </a>
        </span>

        <span class="header-title live-title">Published ({{questions.length}})</span>
      </div>
    </header>

    <main class="pl-15 mw6 m-auto live-main pl15p pr15p">
      
      <div v-if="records_loaded" v-for="question in questions">
        <div class="q-bubble qa-item mb10p">
          <span>{{question.attrs.question}}</span>

          <div class="qa-item__seperator"></div>

          <div>{{all_answers[question.attrs.accepted_answer].answer}}</div>
        </div>

     
        <div>&nbsp;</div>

      </div>
    </main>
  </div>
</template>

<script>
import Question from "../models/Question";
import Answer from "../models/Answer";
import Vote from "../models/Vote";
import { BlockstackMixin } from "../mixins/BlockstackMixin.js";
import { NavMixin } from "../mixins/NavMixin.js";

import { configure } from "radiks";
import moment from "moment";

export default {
  data: function() {
    return {
      questions: [],
      all_answers: [],
      records_loaded: false,
    };
  },
  //votecount will be inc'ted or dec'ted when the user cast a vote..but accurate vote can be viewed only on page refresh

  mixins: [BlockstackMixin, NavMixin],

  mounted() {},

  computed: {},
  watch: {},
  methods: {
    deleteQ: async function(id) {

      this.users = await axios.delete(
                `question/${id}`
              );

      location.reload();


    },

    //callback
    redirect: function(id) {
      this.$router.push({ name: "qdetails", params: { id: id } });

    },

    async publish(attrs) {
      var res = this.displayChosenOrTopAnswer(attrs)
       var qModel = await Question.findById(attrs._id);

       qModel.update({accepted_answer: res._id });
       //  qModel.update({last_event_fired: 'question_ended'});
          await qModel.save()

       location.reload();

    },



   

    async fetchRecords() {
      this.questions = await Question.fetchOwnList({
        expiring_at: { $lt: moment().unix() },
         accepted_answer: { $exists: true } 
      });

      var a_ids = new Array();
      this.questions.forEach(a => a_ids.push(a.attrs.accepted_answer));



      //  this will be converted to $in array based on query-to-mongo
      var answers = await Answer.fetchList({ _id: a_ids.join(",") });

      answers.forEach(a => {
        this.all_answers[a._id] = a.attrs;
      });

      
console.log(this.all_answers);




      this.records_loaded = true;
    }
  },

  created: function() {
    configure(this.RADIKS_SERVER);

    this.fetchRecords();
  },

};
</script>
