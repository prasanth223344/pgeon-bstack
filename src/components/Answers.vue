<template>
  <div>
    <headerforq v-bind:question="question"></headerforq>

    <main class="landing-main mw6 m-auto pl15 pr15 smtp mt15p">
      <div v-if="records_loaded">
        <div class="open-question__right">
          <div class="open-question__meta">
            <span class="open-question__author">{{question.user_id}}</span>
            <span class="open-question__time">
              <allqtimer
                :initial="parseInt(question.expiring_at)"
                :question_id="question._id"
                @event="reload"
              ></allqtimer>
            </span>
          </div>
          <a class="open-question__content selected mt5p m0 no-shadow">
            <p>{{question.question}}</p>
          </a>
        </div>

        <div class="open-question__seperator mt15p mb15p">
          <div class="open-question__seperator__inner mr15p"></div>
          <div class="open-question__seen mr15p">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                d="M569.354 231.631C512.969 135.948 407.808 72 288 72 168.14 72 63.004 135.994 6.646 231.63a47.999 47.999 0 0 0 0 48.739C63.032 376.053 168.192 440 288 440c119.86 0 224.996-63.994 281.354-159.631a48.002 48.002 0 0 0 0-48.738zM416 228c0 68.483-57.308 124-128 124s-128-55.517-128-124 57.308-124 128-124 128 55.517 128 124zm125.784 36.123C489.837 352.277 393.865 408 288 408c-106.291 0-202.061-56.105-253.784-143.876a16.006 16.006 0 0 1 0-16.247c29.072-49.333 73.341-90.435 127.66-115.887C140.845 158.191 128 191.568 128 228c0 85.818 71.221 156 160 156 88.77 0 160-70.178 160-156 0-36.411-12.833-69.794-33.875-96.01 53.76 25.189 98.274 66.021 127.66 115.887a16.006 16.006 0 0 1-.001 16.246zM224 224c0-10.897 2.727-21.156 7.53-30.137v.02c0 14.554 11.799 26.353 26.353 26.353 14.554 0 26.353-11.799 26.353-26.353s-11.799-26.353-26.353-26.353h-.02c8.981-4.803 19.24-7.53 30.137-7.53 35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64z"
              ></path>
            </svg>
            <span>{{(question.hits)?question.hits:0}}</span>
          </div>
          <div class="open-question__comments mr15p">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M256 64c123.5 0 224 79 224 176S379.5 416 256 416c-28.3 0-56.3-4.3-83.2-12.8l-15.2-4.8-13 9.2c-23 16.3-58.5 35.3-102.6 39.6 12-15.1 29.8-40.4 40.8-69.6l7.1-18.7-13.7-14.6C47.3 313.7 32 277.6 32 240c0-97 100.5-176 224-176m0-32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26 3.8 8.8 12.4 14.5 22 14.5 61.5 0 110-25.7 139.1-46.3 29 9.1 60.2 14.3 93 14.3 141.4 0 256-93.1 256-208S397.4 32 256 32z"
              ></path>
            </svg>
            <span>{{answers.length}}</span>
          </div>
          <div class="open-question__votes">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 32c8.823 0 16 7.178 16 16v352c0 8.822-7.177 16-16 16H48c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h352m-34.301 98.293l-8.451-8.52c-4.667-4.705-12.265-4.736-16.97-.068l-163.441 162.13-68.976-69.533c-4.667-4.705-12.265-4.736-16.97-.068l-8.52 8.451c-4.705 4.667-4.736 12.265-.068 16.97l85.878 86.572c4.667 4.705 12.265 4.736 16.97.068l180.48-179.032c4.704-4.667 4.735-12.265.068-16.97z"
              ></path>
            </svg>
            <span>{{vote_count}}</span>
          </div>
        </div>

        <div class="open-question__responses">
          <div v-for="answer in answers">
            {{answer.votes}}
            <div
              class="open-question__response"
              v-bind:class="{ 'fadeIn':  answer.attrs._id == pushed_id}"
              v-if="ownerOfAnswer(answer.attrs.user_id)"
            >
              <p>{{answer.attrs.answer}}</p>

              <span class="trash-cont" v-on:click="delete_answer(answer.attrs._id)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M368 64l-33.6-44.8C325.3 7.1 311.1 0 296 0h-80c-15.1 0-29.3 7.1-38.4 19.2L144 64H40c-13.3 0-24 10.7-24 24v2c0 3.3 2.7 6 6 6h20.9l33.2 372.3C78.3 493 99 512 123.9 512h264.2c24.9 0 45.6-19 47.8-43.7L469.1 96H490c3.3 0 6-2.7 6-6v-2c0-13.3-10.7-24-24-24H368zM216 32h80c5 0 9.8 2.4 12.8 6.4L328 64H184l19.2-25.6c3-4 7.8-6.4 12.8-6.4zm188 433.4c-.7 8.3-7.6 14.6-15.9 14.6H123.9c-8.3 0-15.2-6.3-15.9-14.6L75 96h362l-33 369.4z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div class="open-question__no-responses" v-if="records_loaded && answers.length<1"></div>

        <div v-else>
          <div
            v-for="(answer, index) in answers"
            v-bind:key="answer.attrs._id"
            v-bind:class="{ 'locked':  lock_voting}"
          >
            <v-touch
              v-on:tap="voting_pressed(answer.attrs._id, $event, index)"
              v-bind:class="['open-question__response  jsvote '] "
              v-if="!ownerOfAnswer(answer.attrs.user_id)"
            >
              <p>{{answer.attrs.answer}}</p>

              <span
                id="vote"
                class="voting_container"
                v-bind:class="{ 'vote-up': checkVoted(answer.attrs._id) == 1, 'vote-down': checkVoted(answer.attrs._id) == -1, 'vote-none':  (checkVoted(answer.attrs._id) === false || checkVoted(answer.attrs._id) === 0)}"
              >
                <!-- <img src="/assets/img/sprites/solid.svg" /> -->

                <svg class="caret-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path
                    d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
                  ></path>
                </svg>

                <!-- <svg width="12" height="12" class="c-up">
                <use
                  class="caret-up"
                  xlink:href="/assets/img/sprites/solid.svg#caret-up"
                ></use>
                </svg>-->

                <span></span>
                <div
                  class="v_count"
                  v-bind:class="{ 'vote-up': checkVoted(answer.attrs._id) == 1,  'vote-down': checkVoted(answer.attrs._id) == -1 }"
                >{{(votes_for_answers[answer.attrs._id])?votes_for_answers[answer.attrs._id]:0 }}</div>
                <svg class="caret-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path
                    d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
                  ></path>
                </svg>

                <!-- <svg width="12" height="12" class="c-down">
                <use
                  v-bind:class="{ 'vote-down': checkVoted(answer.attrs._id) == -1 }"
                  class="caret-down"
                  xlink:href="caretdown"
                ></use>
                </svg>-->
              </span>
            </v-touch>
          </div>
        </div>
        <div v-if="!already_answered" class="answer-question__input mw6 orange-caret">
          <div class="alert container" :class="'alert-'+submit_error.class" v-if="submit_error">
            <a href="#" class="close" v-on:click="clearError()">&times;</a>
            <b>{{this.submit_error.title}}</b>
            {{this.submit_error.error}}
          </div>
          <textarea
            v-model="submitted_text"
            @input="maxHighlight"
            :placeholder="'Responding as '+current_user.username+ ''"
            autofocus
            v-else
          ></textarea>
          <div class="js-keeper-placeholder-back" v-html="placeholder_content"></div>

          <button
            class="btn pointer answer-question__send-btn"
            v-if="is_valid"
            v-on:click="submit_answer()"
          >
            <img
              width="22"
              height="22"
              src="../assets/img/svg/loading.svg"
              alt="loading"
              v-if="posting"
            >

            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
              ></path>
            </svg>
          </button>
          <button class="btn pointer answer-question__send-btn" v-else>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M464 4.3L16 262.7C-7 276-4.7 309.9 19.8 320L160 378v102c0 30.2 37.8 43.3 56.7 20.3l60.7-73.8 126.4 52.2c19.1 7.9 40.7-4.2 43.8-24.7l64-417.1C515.7 10.2 487-9 464 4.3zM192 480v-88.8l54.5 22.5L192 480zm224-30.9l-206.2-85.2 199.5-235.8c4.8-5.6-2.9-13.2-8.5-8.4L145.5 337.3 32 290.5 480 32l-64 417.1z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="loader" v-else>
        <img width="22" height="22" src="../assets/img/svg/loading.svg" alt="loading">
      </div>
    </main>
  </div>
</template>

<script>
var longpress;
var pressTimer;

import Answer from "../models/Answer";
import Vote from "../models/Vote";
import Question from "../models/Question";
import Headerforq from "./shared/HeaderForQ.vue";
import Answeringtimer from "./AnsweringTimer.vue";
import { BlockstackMixin } from "../mixins/BlockstackMixin.js";
import { configure } from "radiks";

export default {
  data: function() {
    return {
      answers: [],
      submitted_text: "",
      already_answered: false,
      placeholder: "Enter your response here",
      placeholder_content: "",
      my_votes: [],
      voted_now: 0,
      vote_count: 0,
      records_loaded: false,
      is_valid: false,
      //animateion will work only for the new items coming in not while refreshing the page...
      pushed_id: 0,
      submit_error: false,
      error_class: "danger",
      votes_for_answers: [],
      lock_voting: false,
      posting: false,
    };
  },
  //votecount will be inc'ted or dec'ted when the user cast a vote..but accurate vote can be viewed only on page refresh
  props: ["question"],

  mixins: [BlockstackMixin],

  async mounted() {
    //    await axios.get(`${process.env.API_PATH}/tweet`);
  },

  computed: {},
  watch: {
    answers() {
      for (var i = 0; i < this.answers.length; i++) {
        if (this.answers[i]["attrs"]["user_id"] == this.current_user.username) {
          // console.log('answereed?');
          this.already_answered = true;
          this.placeholder = "You already have posted an answer";
          break;
        }
      }
    }
  },
  methods: {
    //callback

    reload() {
      //alert('reload called')
      location.reload();
    },
    maxHighlight() {
      if(this.submitted_text.length > 0) {
        this.placeholder_content = "";
        this.is_valid = true
      }else {
        this.is_valid = false
      }
     
    },

    clearError() {
      this.submit_error = false;
    },
    voting_pressed(answer_id, e, i) {
      // configure(this.RADIKS_SERVER);

      var current_vote = this.checkVoted(answer_id);

      if (this.lock_voting) return;

      //convert null to 0
      this.votes_for_answers[answer_id] =
        this.votes_for_answers[answer_id] || 0;
      this.lock_voting = true;
      var $icon;
      var $parent;

      $parent = $(e.target).parents(".jsvote");

      $icon = $parent.find("#vote");

      $icon.hasClass("vote-none") && $icon.removeClass("vote-none");

      if (current_vote === 1) {
        $icon.removeClass("vote-up") && this.castVote(answer_id, -1);
        // this.answers[i].vote_count = this.answers[i].vote_count - 1;
        this.votes_for_answers[answer_id] -= 2;
      } else {
        //up voting
        //	    console.log('- to u')
        //are we upvoting from a down vote..ie. long press..then we need a +2 bcz from -1 it should go to +1 not 0
        if (current_vote === -1) {
          $icon.removeClass("vote-down");
          //  	console.log('+2 voting')
          //  this.answers[i].vote_count = parseInt(this.answers[i].vote_count) + 2;
          this.castVote(answer_id, 0);
          this.votes_for_answers[answer_id] += 1;
        } else {
          this.castVote(answer_id, 1); //this.answers[i].vote_count = parseInt(this.answers[i].vote_count) + 1;
          this.votes_for_answers[answer_id] += 1;
        }
      }
    },

    ownerOfAnswer: function(user_id) {
      return this.current_user.username == user_id;
    },
    scrollToEnd: function() {
      var container = this.$el;

      container.scrollTop = container.scrollHeight - container.clientHeight;
    },
    submit_answer: async function() {
      this.posting = true;
      const answer = new Answer({
        question_id: this.question._id,
        user_id: this.current_user.username,
        answer: this.submitted_text
      });
      await answer.save();
      this.fetchRecords();
      this.posting = false;
      this.votes_for_answers = [];

      // this.$http.post('/answer', formData).then((response) => {
      //   this.ted_text = ''
      //  // this.fetchRecords()
      // }, (response) => {
      // 	 	this.submit_error = response.body
      // 	 //	console.log(response.body.error)
      // });
    },

    delete_answer: async function(id) {
      this.users = await axios.delete(`${process.env.API_PATH}/answer/${id}`);

      location.reload();
    },

    castVote: async function(answer_id, vote) {
      // console.log(vote);
      // return;

      this.updateVotesArray(answer_id, vote);

      var rec = await Vote.findOne({
        answer_id: answer_id,
        user_id: this.current_user.username
      });

      if (rec && rec._id) {
        var modelVote = await Vote.findById(rec._id);
        await modelVote.destroy();
      }

      var modelVote = new Vote({
        answer_id: answer_id,
        user_id: this.current_user.username,
        vote: vote,
        question_id: this.question._id
      });
      await modelVote.save();

      this.getVoteCount();

      this.lock_voting = false;

      //  if($vote == 0) {
      //         $sql = 'DELETE FROM votes WHERE user_id = '.$user_id.' AND answer_id = '.$answer_id;
      //     }else {
      //         $sql = 'REPLACE INTO votes SET user_id = '.$user_id.', answer_id = '.$answer_id.', vote =  '.$vote;
      //     }
    },

    async getVoteCount() {
      var rec = await Vote.fetchList(
        {
          question_id: this.question._id
        },
        { decrypt: false }
      );

      this.vote_count = rec.length;
    },
    async fetchRecords() {
      //   configure(this.RADIKS_SERVER);

      var answers = await Answer.fetchList(
        { question_id: this.question._id },
        { decrypt: false }
      );




      this.votes_count = await Vote.fetchList(
        { question_id: this.question._id },
        { decrypt: false }
      );

      for (var i = 0; i < this.votes_count.length; i++) {
        var vote = this.votes_count[i];
        if (!this.votes_for_answers[vote.attrs.answer_id]) {


          this.votes_for_answers[vote.attrs.answer_id] = 0;
        }
        this.votes_for_answers[vote.attrs.answer_id] += parseInt(
          vote.attrs.vote
        );
      }

      var my_votes = await Vote.fetchList(
        {
          question_id: this.question._id,
          user_id: this.current_user.username
        },
        { decrypt: false }
      );

      for (var i = 0; i < my_votes.length; i++) {
        var newVote = {};
        newVote = {
          answer_id: my_votes[i].attrs.answer_id,
          vote: my_votes[i].attrs.vote
        };
        this.my_votes.push(newVote);
      }


      if(this.votes_for_answers.length > 0) {
        var sorted_keys = this.getSortedKeys(this.votes_for_answers);

        sorted_keys.forEach(e => {

          var a = this.fetchById(e, answers);

          this.answers.push(a);
        });
      }else {
         this.answers =  answers
      }



      this.records_loaded = true;
    },

    fetchById(e, answers) {
      var matched_answer = null
      answers.forEach(a => {

        if (e == a._id) {
          matched_answer = a;
        }
      });
      return matched_answer;
    },

    getSortedKeys(obj) {
      var keys = [];
      for (var key in obj) keys.push(key);
      return keys.sort(function(a, b) {
        return obj[b] - obj[a];
      });
    },

    checkVoted(answer_id) {
      for (var i = 0; i < this.my_votes.length; i++) {
        if (this.my_votes[i]["answer_id"] == answer_id) {
          return this.my_votes[i]["vote"];
          break;
        }
      }
      return false;
    },

    //will be called from timer comp
    deleteQ: function() {
      location.reload();
    },

    updateVotesArray(answer_id, vote) {
      //	if(vote == 0 )

      var i = 0;
      while (i < this.my_votes.length) {
        if (this.my_votes[i]["answer_id"] == answer_id) {
          this.my_votes[i]["vote"] = vote;
          return;
        }
        i++;
      }

      //if that vote didn't exist yet push that to array
      var newVote = {};
      newVote = { answer_id: answer_id, vote: vote };
      this.my_votes.push(newVote);
    }
  },

  created: function() {
    //remove the cookie as we are on a answernig screen..

    Answer.addStreamListener(answer => {
      //console.log(answer);
    });

    Question.addStreamListener(question => {
      if (
        question.attrs._id == this.question._id &&
        question.attrs.last_event_fired == "question_ended"
      ) {
        console.log("reloading");

        window.location.reload();
      }
    });

    Vote.addStreamListener(vote => {
      // this callback will be called whenever a task is created or updated.
      // `task` is an instance of `Task`, and all methods are defined on it.
      // If the user has the necessary keys to decrypt encrypted fields on the model,
      // the model will be decrypted before the callback is invoked.
      //console.log(vote);
      // if (task.projectId === myAppsCurrentProjectPageId) {
      //   // update your view here with this task
      // }
    });
    //var com = this;

    // //got some new questions inserted
    // if (socket) {
    //   //just specific to this question id

    //   socket.emit('connect_me', 'Q_' + this.question_id);
    //   socket.on('new_answers', function(response) {
    //   	  com.pushed_id = response.id;
    //     com.answers.push(response)
    //     com.scrollToEnd();
    //   });

    //   socket.on('answer_deleted', function(id) {

    //     for (var i = 0; i < com.answers.length; i++) {
    //       if (com.answers[i]["id"] == id) {
    //         com.answers.splice(i, 1);
    //         com.already_answered = false
    //         com.placeholder = "Enter your response here"
    //         break;
    //       }

    //     }
    //   });

    //   socket.on('question_ended', function(id) {
    //   		alert("Sorry! this question has been ended manually by the asker")
    //   		location.reload();
    //   })

    //    socket.on('question_cancelled', function(id) {
    //   		alert("Sorry! this question has been removed manually by the asker")
    //   		location.href = "/"
    //   		//location.reload();
    //   })

    // }

    this.fetchRecords();

    this.getVoteCount();
  },

  components: {
    Answeringtimer,
    Headerforq
  }
};
</script>
