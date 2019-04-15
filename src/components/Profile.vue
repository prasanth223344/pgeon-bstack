<template>
  <div>
    <header class="live-header">
      <div class="mw6 m-auto flex items-center pl15p justify-between top__header pl-15 pr15">
        <span class="back-arrow dib">
          <a v-on:click="goBack()" class="dib">
            <img width="22" height="22" src="../assets/img/svg/long-arrow-left.svg">
          </a>
        </span>

        <span class="header-title live-title">{{$route.params.id}}</span>
      </div>
    </header>

    <main class="mw6 m-auto smtp profile-details-container pl15 pr15" v-if="records_loaded">
      <div class="score-box flex items-center">
        <div class="w-33 flex justify-center">
          <avatar v-if="records_loaded" :size="80" :src="avatar" :username="$route.params.id"></avatar>
        </div>
        <div class="right w-100 justify-center">
          <div class="flex justify-center tc">
            <div class="w-33">
              <span class="fw7">{{format1000tok(answers_count,2)}}</span>
              <div class="points">Responses</div>
            </div>
            <div class="w-33">
              <span class="fw7">{{format1000tok(q_count,2)}}</span>
              <div class="points">Questions</div>
            </div>
            <div class="w-33">
              <span class="fw7">{{format1000tok(points,2)}}</span>
              <div class="points">{{ points == 1 ? "Point" : "Points" }}</div>
            </div>
          </div>
          <div class="w-100 flex justify-center" v-if="$route.params.id != current_user.username">
            <button class="unfollow following btn w-90" v-on:click="unfollow()" v-if="am_i_following">Following</button>

            <button class="follow btn w-90" v-on:click="follow()" v-else>Follow</button>
          </div>
        </div>
      </div>
      <div class="open-question__container" v-for="question in questions">
        <div class="open-question__right">
          <div class="open-question__meta">
            <router-link
              class="open-question__author"
              :to="{ name: 'friendship', params: { q_by: question.user_id, a_by: question.accepted_user }}"
            >
              <span class="open-question__author">{{question.user_id}} ← {{question.accepted_user}}</span>
            </router-link>
            <span
              class="open-question__time"
            >{{ago(all_answers[question.accepted_answer].createdAt)}}</span>
          </div>
          <div class="q-bubble-container q-bubble-container--clickable mt5p mb15p">
            <div class="q-bubble qa-item">
              <div>
                <span>{{question.question}}</span>
              </div>
              <div class="qa-item__seperator"></div>
              <span>{{all_answers[question.accepted_answer].answer}}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Question from "../models/Question";
import Answer from "../models/Answer";
import Vote from "../models/Vote";
import Following from "../models/Following";
import { BlockstackMixin } from "../mixins/BlockstackMixin.js";
import { CommonMixin } from "../mixins/CommonMixin.js";
import { NavMixin } from "../mixins/NavMixin.js";
import Avatar from "vue-avatar";

import { configure } from "radiks";
import moment from "moment";

export default {
  data: function() {
    return {
      questions: [],
      all_answers: [],
      records_loaded: false,
      avatar: null,
      answers_count: 0,
      q_count: 0,
      points: 0,
      am_i_following: false
    };
  },
  //votecount will be inc'ted or dec'ted when the user cast a vote..but accurate vote can be viewed only on page refresh

  mixins: [BlockstackMixin, NavMixin, CommonMixin],

  mounted() {},

  computed: {},
  watch: {},
  methods: {
    deleteQ: async function(id) {
      this.users = await axios.delete(`question/${id}`);

      location.reload();
    },
    ago(mcs) {
      return moment.unix(mcs / 1000).fromNow();
    },
   

    follow: async function() {
      //  $.post('follow',  )
      //  $(event.target).children().remove()
      const follow = new Following({
        user_id: this.$route.params.id,
        followed_by: this.current_user.username
      });
      await follow.save();
      this.am_i_following = true;
      // success callback
    },

    unfollow: async function() {
      //  $.post('unfollow',  )

      var rec = await Following.fetchList({
        user_id: this.$route.params.id,
        followed_by: this.current_user.username
      });

      await rec[0].destroy();
      this.am_i_following = false;
    },

    async fetchRecords() {
      var results = [];
      this.users = await axios.get(`profileqa/${this.$route.params.id}`);
      this.questions = this.users.data;

      var a_ids = new Array();
      var my_answers = new Array();
      this.questions.forEach(q => {
        a_ids.push(q.accepted_answer);
        //own qs
        if (q.user_id == this.$route.params.id) {
          this.q_count++;
        } else {
          //it's his answer
          this.answers_count++;
          my_answers.push(q.accepted_answer);
        }
      });

      var answers = await Answer.fetchList({ _id: a_ids.join(",") });

      answers.forEach(a => {
        this.all_answers[a._id] = a.attrs;
      });

      //votes he earned
      var votes = await Vote.fetchList({ answer_id: my_answers.join(",") });

      votes.forEach(v => {
        // console.log(v.attrs.vote);
        this.points += v.attrs.vote;
        //this.all_answers[a._id] = a.attrs;
      });

      this.avatar = await this.loadIndivProfilePic(this.$route.params.id);

      //not same user

      if (this.$route.params.id != this.current_user.username) {
        var recs = await Following.fetchList(
          {
            followed_by: this.current_user.username,
            user_id: this.$route.params.id
          },

          { decrypt: false }
        );
        if (recs[0]) this.am_i_following = true;
      }

      this.records_loaded = true;
    }
  },
  components: {
    Avatar
  },

  created: function() {
    configure(this.RADIKS_SERVER);

    this.fetchRecords();
  }
};
</script>
