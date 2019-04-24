<template>
  <div>
    <headerwithback></headerwithback>

    <main class="mw6 m-auto question-main">
      <div class="post-question-box mb20p">
        <textarea
          class="post-question-textarea orange-caret"
          :placeholder="ago"
          data-gramm_editor="false"
          autofocus
          maxlength="200"
          name="question"
          v-model="question"
          @input="maxHighlight"
        ></textarea>

        <div class="post-question-share">
          <div class="post-question-share__meta flex justify-between">
            <div class="flex align-center"></div>
            <div
              class="post-question-count"
              v-bind:class="[ remainingLength < 0 ? 'redish1' : '']"
            >{{remainingLength}}</div>
          </div>
        </div>

        <div class="post-question-share flex auto-share-toggle dn">
          <a href="/connected-accounts" class="share-add share-circle fc mr20p">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M436 238H242V44c0-6.6-5.4-12-12-12h-12c-6.6 0-12 5.4-12 12v194H12c-6.6 0-12 5.4-12 12v12c0 6.6 5.4 12 12 12h194v194c0 6.6 5.4 12 12 12h12c6.6 0 12-5.4 12-12V274h194c6.6 0 12-5.4 12-12v-12c0-6.6-5.4-12-12-12z"
              ></path>
            </svg>
          </a>
          <input class="social-share-cb dn" type="checkbox" id="twitter-share" checked>
          <label class="share-social share-circle mr15p" for="twitter-share">
            <img src="http://via.placeholder.com/38x38">
            <div class="svg-container svg-container--twitter fc">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                ></path>
              </svg>
            </div>
          </label>
          <input class="social-share-cb dn" type="checkbox" id="facebook-share">
          <label class="share-social share-circle" for="facebook-share">
            <img src="http://via.placeholder.com/38x38">
            <div class="svg-container svg-container--fb fc">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"
                ></path>
              </svg>
            </div>
          </label>
        </div>

        <div class="post-question-action">
          <div>
            <div class="post-question-action__date">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"
                ></path>
              </svg>
              <span class="pt2">
                <span class="pointer">
                  <select name="days" id="day-select" v-model="dd" class="no-r">
                    <option value="00">00 days</option>
                    <option value="01">01 days</option>
                    <option value="02">02 days</option>
                    <option value="03">03 days</option>
                    <option value="04">04 days</option>
                    <option value="05">05 days</option>
                    <option value="06">06 days</option>
                  </select>
                </span> :
                <span class="pointer">
                  <select name="hours" id="hour-select" v-model="hh" class="no-r">
                    <option value="00">00 hrs</option>
                    <option value="01">01 hrs</option>
                    <option value="02">02 hrs</option>
                    <option value="03">03 hrs</option>
                    <option value="04">04 hrs</option>
                    <option value="05">05 hrs</option>
                    <option value="06">06 hrs</option>
                    <option value="07">07 hrs</option>
                    <option value="08">08 hrs</option>
                    <option value="09">09 hrs</option>
                    <option value="10">10 hrs</option>
                    <option value="11">11 hrs</option>
                    <option value="12">12 hrs</option>
                    <option value="13">13 hrs</option>
                    <option value="14">14 hrs</option>
                    <option value="15">15 hrs</option>
                    <option value="16">16 hrs</option>
                    <option value="17">17 hrs</option>
                    <option value="18">18 hrs</option>
                    <option value="19">19 hrs</option>
                    <option value="20">20 hrs</option>
                    <option value="21">21 hrs</option>
                    <option value="22">22 hrs</option>
                    <option value="23">23 hrs</option>
                  </select>
                  <span class="fa fa-sort text-muted" style="vertical-align: text-bottom;"></span>
                  <select name="mins" id="minute-select" v-model="mm" class="no-r">
                    <option value="00" :disabled="lt5_disabled">00 min</option>
                    <option value="01" :disabled="lt5_disabled">01 min</option>
                    <option value="02" :disabled="lt5_disabled">02 min</option>
                    <option value="03" :disabled="lt5_disabled">03 min</option>
                    <option value="05">05 min</option>
                    <option value="10">10 min</option>
                    <option value="15">15 min</option>
                    <option value="20">20 min</option>
                    <option value="25">25 min</option>
                    <option value="30">30 min</option>
                    <option value="35">35 min</option>
                    <option value="40">40 min</option>
                    <option value="45">45 min</option>
                    <option value="50">50 min</option>
                    <option value="55">55 min</option>
                  </select>
                </span>
              </span>
            </div>
          </div>

          <button @click="save" :disabled="!is_valid">
            <img width="22" height="22" src="../assets/img/svg/loading.svg" alt="loading" v-if="posting">
            <span v-else>Post Question</span>
          </button>
        </div>
      </div>
      <!-- <div class="error alert alert-warning animated shake" role="alert">

    Please include at-least one question mark.
      </div>-->
    </main>

    <main class="mw6 m-auto">
      <!-- hide this part until ask part opens up..otherwise it is juggling -->
      <div class="question-stats" v-if="records_loaded">
        <router-link
          :to="{ path: 'live'  }"
          class="question-stats__item spin"
          v-if="live.length > 0"
        >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M288 24.103v8.169a11.995 11.995 0 0 0 9.698 11.768C396.638 63.425 472 150.461 472 256c0 118.663-96.055 216-216 216-118.663 0-216-96.055-216-216 0-104.534 74.546-192.509 174.297-211.978A11.993 11.993 0 0 0 224 32.253v-8.147c0-7.523-6.845-13.193-14.237-11.798C94.472 34.048 7.364 135.575 8.004 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.789 504 256c0-121.187-86.924-222.067-201.824-243.704C294.807 10.908 288 16.604 288 24.103z"
              ></path>
            </svg>
            <span>Open</span>
          </div>

          <span>{{live.length}}</span>
        </router-link>

        <a class="question-stats__item" v-else>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M288 24.103v8.169a11.995 11.995 0 0 0 9.698 11.768C396.638 63.425 472 150.461 472 256c0 118.663-96.055 216-216 216-118.663 0-216-96.055-216-216 0-104.534 74.546-192.509 174.297-211.978A11.993 11.993 0 0 0 224 32.253v-8.147c0-7.523-6.845-13.193-14.237-11.798C94.472 34.048 7.364 135.575 8.004 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.789 504 256c0-121.187-86.924-222.067-201.824-243.704C294.807 10.908 288 16.604 288 24.103z"
              ></path>
            </svg>
            <span>Open</span>
          </div>

          <span>{{live.length}}</span>
        </a>

        <router-link
          :to="{ path: 'pending'  }"
          class="question-stats__item"
          v-if="pending.length > 0"
        >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z"
              ></path>
            </svg>
            <span>Pending</span>
          </div>

          <span>{{pending.length}}</span>
        </router-link>

        <a class="question-stats__item" v-else>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z"
              ></path>
            </svg>
            <span>Pending</span>
          </div>

          <span>{{pending.length}}</span>
        </a>

        <router-link
          :to="{ path: 'published'  }"
          class="question-stats__item"
          v-if="published.length > 0"
        >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"
              ></path>
            </svg>
            <span>Published</span>
          </div>

          <span>{{published.length}}</span>
        </router-link>

        <a class="question-stats__item" v-else>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"
              ></path>
            </svg>
            <span>Published</span>
          </div>

          <span>{{published.length}}</span>
        </a>
      </div>
        <div class="loader" v-else>
      <img width="22" height="22" src="../assets/img/svg/loading.svg" alt="loading">
      </div>
    </main>
  </div>
</template>


<script>
import { configure } from "radiks";
import Headerwithback from "./shared/HeaderWithBack.vue";
import { BlockstackMixin } from "../mixins/BlockstackMixin.js";

import Question from "../models/Question";
import { User } from "radiks";
import moment from "moment";

export default {
  data() {
    return {
      question: "",
      dd: "01",
      hh: "00",
      mm: "00",
      lt5_disabled: false,
      hasQMark: false,
      is_valid: false,
      placeholder_content: "",
      remainingLength: 150,
      user: null,
      live: [],
      pending: [],
      published: [],
      ago: null,
      records_loaded: false,
      posting: false
    };
  },
  computed: {
    // get only
  },
  components: {
    Headerwithback
  },
    mixins: [BlockstackMixin],

  watch: {
    question: function(nval) {
      if (nval.indexOf("?") >= 0) this.hasQMark = true;
      else this.hasQMark = false;
    },

    dd: function() {
      // if (
      //   this.dd == "00" &&
      //   this.mm != "00" &&
      //   parseInt(this.mm) <= 5 &&
      //   this.hh == "00"
      // ) {
      //   this.mm = "05";
      //   this.lt5_disabled = true;
      // } else if (this.dd == "00" && this.mm == "00" && this.hh == "00") {
      //   this.hh = "01";
      //   this.lt5_disabled = true;
      // } else {
      //   this.lt5_disabled = false;
      // }
    },
    hh: function() {
      if (this.dd == "00" && parseInt(this.mm) <= 5 && this.hh == "00") {
        this.mm = "05";
        this.lt5_disabled = true;
      } else {
        this.lt5_disabled = false;
      }
    }
  },
  methods: {
    async save() {
      configure(this.RADIKS_SERVER);

      //always UTC

      var expiring_at = moment()
        .utc()
        .add(this.dd, "d")
        .add(this.hh, "h")
        .add(this.mm, "m")
        .unix();

      this.posting = true
      const question = new Question({
        question: this.question,
        user_id: this.user._id,
        expiring_at: expiring_at
      });
      var q = await question.save();
      this.question = "";
      this.$toaster.info("Question posted successfully.");
      var com = this

      
      var str = JSON.stringify({
        radiksType: "Notification",
        created_by: this.user._id,
        question_id: q._id,
        type: "question_posted"
      });
      // await axios.post(`${process.env.API_PATH}/notification/${str}` );

      await axios.post(
        `${process.env.RADIKS_SERVER}/notification/insert/${str}`
      );

      
      setTimeout(function() {
        com.posting = true
        window.location.reload();
      }, 3000);
    },
    maxHighlight() {
      var currentValue = this.question;
      var realLength = 150;
      this.remainingLength = 150 - currentValue.length;
      //  console.log(remainingLength);
      if (0 > this.remainingLength) {
        // Split value if greater than
        var allowedValuePart = currentValue.slice(0, realLength),
          refusedValuePart = currentValue.slice(realLength);
        this.is_valid = false;

        // Fill the hidden div.
        //this.placeholder_content = allowedValuePart + '<em>' + refusedValuePart + '</em>'
      } else {
        this.placeholder_content = "";
        this.is_valid = currentValue.length > 0;
      }
    }
  },
  async mounted() {
    configure(this.RADIKS_SERVER);

    this.user = await User.currentUser();

    var recs = await Question.fetchList(
      { user_id: this.user._id },
      { decrypt: false }
    );

    var last_created = null;
    recs.forEach(q => {
      if (q.attrs.createdAt > last_created) {
        last_created = q.attrs.createdAt;
      }

      if (q.attrs.expiring_at > moment().unix()) {
        this.live.push(q);
      } else if (
        typeof q.attrs.accepted_answer === "undefined" ||
        q.attrs.accepted_answer == null
      ) {
        this.pending.push(q);
      } else if (q.attrs.accepted_answer != null) {
        this.published.push(q);
      }
    });

    if (last_created) {
      this.ago =
        "You last posted a question " +
        moment.unix(last_created / 1000).fromNow() +
        "..";
    } else {
      this.ago = "Go ahead and post your first question";
    }
    this.records_loaded = true
  }
};
</script>
