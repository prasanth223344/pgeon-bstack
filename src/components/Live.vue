<template>
  <div>
    <header class="live-header">
      <div class="mw6 m-auto flex items-center pl15p justify-between top__header pl-15 pr15">
        <span class="back-arrow dib">
          <a v-on:click="goBack()" class="dib">
            <img width="22" height="22" src="../assets/img/svg/times.svg">
          </a>
        </span>

        <span class="header-title live-title">
          Live ({{questions.length}})
        </span>
      </div>
    </header>


<main class="pl-15 mw6 m-auto live-main pl15p pr15p">
  <div v-for="question in questions" >
    <div class="q-bubble goto-qdetail" v-on:click="redirect(question._id)">
        <span  >

           {{question.attrs.question}}
           </span>
    </div>
    <div> &nbsp; </div>
    </div>
</main>



    
  </div>
</template>

<script>
import Question from "../models/Question";
import { BlockstackMixin } from "../mixins/BlockstackMixin.js";
import { NavMixin } from "../mixins/NavMixin.js";

import { configure } from "radiks";
import moment from 'moment';

export default {
  data: function() {
    return {
      questions: []
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
        this.$router.push({ name: 'qdetails', params: { id: id  } })


      //alert('reload called')
      //location.reload();
    },

    clearError() {
      this.submit_error = false;
    },

    async fetchRecords() {

      this.questions = await Question.fetchList( { expiring_at: {'$gt':  moment().unix() },  user_id : this.current_user.username});
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
