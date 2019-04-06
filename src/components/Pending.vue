<template>
  <div>
    <header class="live-header">
      <div class="mw6 m-auto flex items-center pl15p justify-between top__header pl-15 pr15">
        <span class="back-arrow dib">
          <a v-on:click="goBack()" class="dib">
            <img width="22" height="22" src="../assets/img/svg/times.svg">
          </a>
        </span>

        <span class="header-title live-title">Pending ({{questions.length}})</span>
      </div>
    </header>

    <main class="pl-15 mw6 m-auto live-main pl15p pr15p">
      <div v-for="question in questions">
        <div class="q-bubble qa-item mb10p">
          <span>{{question.attrs.question}}</span>

          <div class="qa-item__seperator"></div>

          <div>{{displayChosenOrTopAnswer(question.attrs)}}</div>
        </div>
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
      answers_for_qs: [],
      all_answers: [],
      votes_for_qs: [],
      qs_with_ans_and_vote_count: [],
      records_loaded: false
    };
  },
  //votecount will be inc'ted or dec'ted when the user cast a vote..but accurate vote can be viewed only on page refresh

  mixins: [BlockstackMixin, NavMixin],

  mounted() {},

  computed: {},
  watch: {},
  methods: {
    //callback
    redirect: function(id) {
      this.$router.push({ name: "qdetails", params: { id: id } });

      //alert('reload called')
      //location.reload();
    },

    displayChosenOrTopAnswer(attrs) {
      //wait for load
      if (!this.records_loaded) return;
      if (attrs.manually_chosen_as_top) {
        return this.answers_for_qs[attrs._id].attrs.answer;
      } else {
        console.log(this.qs_with_ans_and_vote_count[attrs._id]);
        //if it has some ans and votes
        if (this.qs_with_ans_and_vote_count[attrs._id]) {
          var q = this.qs_with_ans_and_vote_count[attrs._id];

          var n = null;
          Object.keys(q).forEach(function(o) {
            if (!n) n = q[o];
            else if (n < q[o]) {
              n = q[o];
            }
          });
          var top_votes = Object.keys(q).filter(function(o) {
            return q[o] == n;
          });

          var ans_id = top_votes[0];
          return this.all_answers[ans_id].attrs.answer;
          
     
        }
      }
    },

    clearError() {
      this.submit_error = false;
    },

    async fetchRecords() {
      this.questions = await Question.fetchOwnList({
        expiring_at: { $lt: moment().unix() },
        accepted_answer: 0
      });
      var q_ids = new Array();
      this.questions.forEach(q => q_ids.push(q._id));

      //  this will be converted to $in array based on query-to-mongo
      var answers = await Answer.fetchList({ question_id: q_ids.join(",") });
      
      answers.forEach(a => {
        this.all_answers[a.attrs._id] = a
        if (!this.answers_for_qs[a.attrs.question_id])
          this.answers_for_qs[a.attrs.question_id] = [];
        this.answers_for_qs[a.attrs.question_id].push(a);
      });

      var votes = await Vote.fetchList(
        { question_id: q_ids.join(","), deleted: false },
        { decrypt: false }
      );

      votes.forEach(v => {
        if (!this.votes_for_qs[v.attrs.question_id])
          this.votes_for_qs[v.attrs.question_id] = [];
        this.votes_for_qs[v.attrs.question_id].push(v);
        if (!this.qs_with_ans_and_vote_count[v.attrs.question_id])
          this.qs_with_ans_and_vote_count[v.attrs.question_id] = {};

        if (
          !this.qs_with_ans_and_vote_count[v.attrs.question_id][
            v.attrs.answer_id
          ]
        )
          this.qs_with_ans_and_vote_count[v.attrs.question_id][
            v.attrs.answer_id
          ] = 0;

        this.qs_with_ans_and_vote_count[v.attrs.question_id][
          v.attrs.answer_id
        ] += v.attrs.vote;
      });

      // console.log(this.qs_with_ans_and_vote_count);

      //this.questions

      this.records_loaded = true;
    }
  },

  created: function() {
    configure(this.RADIKS_SERVER);

    this.fetchRecords();
  },

  components: {}
};
</script>
