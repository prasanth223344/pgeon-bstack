<template>
  <div>
    <header class="live-header">
      <div class="mw6 m-auto flex items-center pl15p justify-between top__header pl-15 pr15">
        <span class="back-arrow dib">
          <a v-on:click="goBack()" class="dib">
            <img width="22" height="22" src="../assets/img/svg/long-arrow-left.svg">
          </a>
        </span>

        <span class="header-title live-title">My Account</span>
      </div>
    </header>

    <main class="my-account">
      <ul class="ul-ls">
        <li class="ul-ls--last">
          <a href="/" class="delete-account mw6 m-auto pl15 pr15">
            <span class="redish1">Delete Account</span>
          </a>
          <span class="m-auto mw6 db">
            <div class="border-trimmed"></div>
          </span>
        </li>
      </ul>
    </main>

    <div class="delete-account-modal">
      <div class="delete-account-modal-overlay standard-overlay"></div>
      <div class="center-modal mw6 m-auto">
        <div class="delete-account-modal__modal">
          <h2 class="modal-header">Delete Account</h2>
          <p class="modal-content">
            <strong>{{current_user.username}},</strong> are you sure you want to delete your Pgeon account? This will delete all published content, top response rankings, and any/all points acquired. This Action cannot be undone
          </p>

          <div class="delete-account-btns">
            <button type="button" id="delete-sso" class="base-btn confirm-deletion">Confirm deletion</button>
            <button class="base-btn keep-account">Keep Account</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Question from "../models/Question";
import Answer from "../models/Answer";
import Vote from "../models/Vote";
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
      answers_count: 100,
      q_count: 0,
      points: 0
    };
  },
  //votecount will be inc'ted or dec'ted when the user cast a vote..but accurate vote can be viewed only on page refresh

  mixins: [BlockstackMixin, NavMixin, CommonMixin],

  mounted() {},

  computed: {},
  watch: {},
  methods: {
    deleteQ: async function(id) {
      this.users = await axios.delete(`${process.env.API_PATH}/question/${id}`);

      location.reload();
    },

    async fetchRecords() {
      var results = [];
      this.users = await axios.get(`${process.env.API_PATH}/profileqa/${this.$route.params.id}`);
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

      this.records_loaded = true;
    }
  },
  components: {
    Avatar
  },

  created: function() {
    configure(this.RADIKS_SERVER);

    this.fetchRecords();
  },
  mounted: function() {
    const openDeleteAccountModal = e => {
      e.preventDefault();
      $(".delete-account-modal").addClass("delete-account-modal--visible");
    };
    const closeDeleteAccountModal = e => {
      $(".delete-account-modal").removeClass("delete-account-modal--visible");
      console.log("closeDeleteAccountModal");
    };
    $(".delete-account").on("click", openDeleteAccountModal);
    $(".delete-account-modal-overlay").on("click", closeDeleteAccountModal);
    $(".keep-account").on("click", closeDeleteAccountModal);
  }
};
</script>
