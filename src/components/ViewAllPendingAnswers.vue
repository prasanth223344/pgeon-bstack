<template>
  <div>
    <header class="landing_header relative">
      <div
        class="mw6 m-auto landing_header__inner flex items-center top__header relative pr15 pl15"
      >
        <a v-on:click="goBack()" class="question-details__close pointer">
          <svg version="1.1" viewBox="0 0 448 256" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
              <g fill="#4A4A4A" fill-rule="nonzero">
                <path
                  d="m136.97 252.48l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971l-83.928-83.444h375.89c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12h-375.89l83.928-83.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-116.48 116c-4.686 4.686-4.686 12.284 0 16.971l116.48 116c4.686 4.686 12.284 4.686 16.97-1e-3z"
                ></path>
              </g>
            </g>
          </svg>
        </a>
        <div class="question-details__profile">
          <p class="m0">All Responses</p>
        </div>
        <div class="pointer save_button">
          <span v-on:click="saveChosenAnswer()">Save</span>
        </div>
      </div>
      <div class="details__dropdown__container mw6 m-auto"></div>
      <div class="details__overlay standard-overlay"></div>
    </header>

    <main class="landing-main mw6 m-auto pl15 pr15" v-if="records_loaded">
      <div class="open-question__right">
        <div class="open-question__meta">
          <span class="open-question__author">{{question.attrs.user_id}}</span>
          <span class="open-question__time">Ended {{formatDate(question.attrs.expiring_at)}}</span>
        </div>
        <a href="/question/234/details" class="open-question__content mt5p m0">
          <p>{{question.attrs.question}}</p>
        </a>
      </div>

      <div class="open-question__seperator mt15p mb15p">
        <div class="open-question__seperator__inner open-question__seperator__inner--fullwidth"></div>
      </div>

      <div class="open-question__responses">
        <div class="open-question__response pointer" v-for="answer in answers" v-bind:class="{'chosen': answer._id == answer_id}" :id="answer._id" v-on:click="selectAnswer(answer._id)" >
        <p>{{answer.attrs.answer}}</p>
        <div class="mr10p"> {{ ans_with_vote_count[answer._id]}} </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Question from "../models/Question";
import Answer from "../models/Answer";
import Vote from "../models/Vote";
import { configure } from "radiks";
import { NavMixin } from "../mixins/NavMixin.js";

import moment from "moment";

export default {
  data: function() {
    return {
      answers: [],
      my_votes: [],
      qid: 0,
      top_a: 0,
      question: null,
      answer_id: 0,
      ans_with_vote_count:[],
      records_loaded: false
    };
  },
    mixins: [NavMixin],


  mounted() {},

  methods: {
    async fetchRecords() {
      this.answer_id = this.top_a;

      this.question = await Question.findById(this.qid);

      this.answers = await Answer.fetchList({ question_id: this.qid });

      var votes = await Vote.fetchList(
        { question_id: this.qid },
        { decrypt: false }
      );

      votes.forEach(v => {

        if (!this.ans_with_vote_count[v.attrs.answer_id])
          this.ans_with_vote_count[v.attrs.answer_id] = 0;

        this.ans_with_vote_count[v.attrs.answer_id] += v.attrs.vote;
      });

      this.records_loaded = true;

    },

    selectAnswer(answer_id) {
      this.answer_id = answer_id;
    },

    async saveChosenAnswer() {
      this.question.update({manually_chosen_as_top: this.answer_id});
      await this.question.save();
      this.$router.replace({ name: 'viewpanswers', params: { qid: this.qid, top_a: this.answer_id } })
      
      //location.href=`/pending/${this.question_id}/${this.answer_id}`
    },
     formatDate(dt) {
      return  moment.unix(dt).format("MM/DD/YYYY")
    }

   
  },

  created: function() {
    configure(this.RADIKS_SERVER);

    this.qid = this.$route.params.qid;
    this.top_a = this.$route.params.top_a;

    this.fetchRecords();
  }
};
</script>
