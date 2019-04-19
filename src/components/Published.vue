<template>
  <div>
    <header class="live-header"          v-bind:class="{ 'published-editing':  editmode}"
>
      <div class="mw6 m-auto flex items-center pl15p justify-between top__header pl-15 pr15">
        <span class="back-arrow dib">
          <a v-on:click="goBack()" class="dib">
            <img width="22" height="22" src="../assets/img/svg/times.svg">
          </a>
        </span>

        <span class="header-title live-title">Published ({{questions.length}})</span>
                <button class="pointer published-edit edit" v-on:click="editmode=true">Edit</button>

    <div class="published-select-all pointer"  v-bind:class="{ 'published-select-all--selected':  all_selected}"   v-on:click="toggleAll()">
        <span class="span-checkbox"></span>

        <button class="pointer">
         Select All 
        </button>
      </div>

      <div v-on:click="deleteQ()" class="published-delete pointer" v-bind:class="{ 'published-delete--show':  selection.length > 0}"  >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M368 64l-33.6-44.8C325.3 7.1 311.1 0 296 0h-80c-15.1 0-29.3 7.1-38.4 19.2L144 64H40c-13.3 0-24 10.7-24 24v2c0 3.3 2.7 6 6 6h20.9l33.2 372.3C78.3 493 99 512 123.9 512h264.2c24.9 0 45.6-19 47.8-43.7L469.1 96H490c3.3 0 6-2.7 6-6v-2c0-13.3-10.7-24-24-24H368zM216 32h80c5 0 9.8 2.4 12.8 6.4L328 64H184l19.2-25.6c3-4 7.8-6.4 12.8-6.4zm188 433.4c-.7 8.3-7.6 14.6-15.9 14.6H123.9c-8.3 0-15.2-6.3-15.9-14.6L75 96h362l-33 369.4z"></path></svg>

        <button > Delete </button>
        
           
      </div>
       <button class="published-cancel pointer cancel_edit" v-on:click="editmode=false">
        Cancel
      </button>
      </div>
    </header>

    <main class="pl-15 mw6 m-auto live-main pl15p pr15p"   v-bind:class="{ 'published-main-editing':  editmode}">
      
      <div v-if="records_loaded" v-for="question in questions" class="q-bubble-container q-bubble-container--clickable  mb15p " >
          <span class="edit-square" v-if="selection.indexOf(question._id) < 0 && editmode" v-on:click="addtoselection(question._id)">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352z"></path></svg>

                       


    </span>
    <span class="edit-square-checked" v-if="selection.indexOf(question._id) >= 0 && editmode" v-on:click="removefromselection(question._id)">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"></path></svg>


    </span>
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
      editmode:false,
      selection: [],
      all_selected:false
    };
  },
  //votecount will be inc'ted or dec'ted when the user cast a vote..but accurate vote can be viewed only on page refresh

  mixins: [BlockstackMixin, NavMixin],

  mounted() {




  },

  computed: {},
  watch: {},
  methods: {
    addtoselection: function(id) {
        this.selection.push(id)
    },
    removefromselection: function(id) {
      this.selection =  this.selection.filter(e => e !== id);
   
    },
    toggleAll: function() {
      
      this.selection = []
      if(!this.all_selected)
        this.questions.forEach(q => this.selection.push(q._id));
      this.all_selected = !this.all_selected

    },
    clearAll:function() {
      this.selection = []
    },

    deleteQ: async function() {


console.log(`question-multiple/${this.selection.join(",")}`);

     await axios.delete(
                `${process.env.API_PATH}/question-multiple/${this.selection.join(",")}`
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
