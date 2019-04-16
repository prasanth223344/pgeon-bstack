<template>
  <div>
    <headerwithback></headerwithback>

    <div class="bgw">
      <div class="people-tabs mw6 m-auto pr15">
        <div
          class="people-tab"
          v-bind:class="{'people-tab--active': current_tab == 'iam_following'}"
        >
          <a v-on:click="setcurrenttab('iam_following')">{{iam_following_count}} Following</a>
        </div>
        <div
          class="people-tab"
          v-bind:class="{'people-tab--active': current_tab == 'my_followers'}"
        >
          <a v-on:click="setcurrenttab('my_followers')">{{my_followers_count}} Followers</a>
        </div>
        <div class="people-search">
          <router-link :to="{ path: '/search' }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"
              ></path>
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <main class="mw6 m-auto people-main">
      <div v-bind:class="{ 'hidden': (this.current_tab != 'iam_following') }">
        <div class="people-item" v-for="item in iam_following_formatted">
          <div>
            <avatar :size="36" :src="item.profile_pic" :username="item.user_id"></avatar>
            <div class="people-item__info">
              <h4>{{ item.user_id }}</h4>
              <span>{{item.last_posted}}</span>
            </div>
          </div>
          <button
            v-if="isExistsinUndo(item.user_id)"
            v-on:click="followNoUpdate(item.user_id)"
            class="follow-button"
          >
            <img
              width="22"
              height="22"
              src="../assets/img/svg/loading.svg"
              alt="loading"
              v-if="posting.indexOf(item.user_id) >= 0"
            >

            <span v-else>Follow</span>
            <!-- following is the `active` state -->
          </button>
          <button
            v-else
            v-on:click="unfollowNoUpdate(item.user_id)"
            class="follow-button follow-button--active"
          >
            <!-- following is the `active` state -->
            <span>Following</span>
          </button>
        </div>
      </div>

      <div v-bind:class="{ 'hidden': (this.current_tab == 'iam_following') }">
        <div class="people-item" v-for="item in my_followers_temp">
          <div>
            <!-- <avatar :size="36"	:src="item.profile_pic"  :username="item.user_id" ></avatar>  -->
            <avatar :size="36" :src="item.profile_pic" :username="item.user_id"></avatar>
            <div class="people-item__info">
              <h4>{{ item.user_id }}</h4>
              <span>{{item.last_posted}}</span>
            </div>
          </div>
          <button
            v-if="!isExistsinFollowing(item.user_id)"
            v-on:click="follow(item.user_id)"
            class="follow-button"
          >
            <img
              width="22"
              height="22"
              src="../assets/img/svg/loading.svg"
              alt="loading"
              v-if="posting.indexOf(item.user_id) >= 0"
            >

            <span v-else>Follow</span>
            <!-- following is the `active` state -->
          </button>
          <button
            v-else
            v-on:click="unfollowNoUpdate(item.user_id)"
            class="follow-button follow-button--active"
          >
            <!-- following is the `active` state -->
            <span>Following</span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { configure } from "radiks";

import Avatar from "vue-avatar";
import Headerwithback from "./shared/HeaderWithBack.vue";
import { User } from "radiks";
import moment from "moment";
import { BlockstackMixin } from "../mixins/BlockstackMixin.js";
import Question from "../models/Question";

import Following from "../models/Following";

export default {
  data: function() {
    return {
      iam_following: [],
      //this will hold model..not array
      iam_following_formatted: [],
      //this is used for holding i_am folliwing temporarily so it can reflect in i_am_follwing tab during undoing purpose
      temp_iam_following: [],

      my_followers: [],
      iam_following_count: 0,
      my_followers_count: 0,
      current_tab: "iam_following",
      //  current_order: false,
      current_order: "DESC",
      showsorting: false,
      unfollwed_undo: [],
      //TODO my_followers is not reactive for some reasons..will be fixed in future..
      my_followers_temp: [],
      posting: []
    };
  },
  mounted() {
    //   console.log('Component mounted.')
  },
  created: function() {
    //only the first time all update..from there only update the my_followers..I_am_follwogin left intact for undo purpose
    this.fetchData();
  },
  components: {
    Avatar,
    Headerwithback
  },
  mixins: [BlockstackMixin],

  methods: {
    setcurrenttab(tab) {
      this.current_tab = tab;
      this.sort();
    },
    sort() {
      // if(!this.current_order ||  this.current_order == 'ASC') {
      //     this[this.current_tab].sort(function(a, b){
      //         return a.convo_count - b.convo_count;
      //     });
      // }else if(this.current_order == 'DESC') {
      //     this[this.current_tab].sort(function(a, b){
      //         return b.convo_count - a.convo_count;
      //     });
      // }
    },
    async assignVals(include_i_am_following) {
      this.my_followers = await Following.fetchList(
        { user_id: this.current_user.username },
        { decrypt: false }
      );

      var recs = await Following.fetchList(
        { followed_by: this.current_user.username },
        { decrypt: false }
      );

      if (include_i_am_following) {
        this.iam_following = recs;
      }

      this.temp_iam_following = recs;
      this.iam_following_count = this.temp_iam_following.length;

      this.my_followers_count = this.my_followers.length;

      var formatted_us = [];
      for (var i = 0; i < this.my_followers.length; i++) {
        formatted_us.push({
          user_id: this.my_followers[i].attrs.followed_by,
          profile_pic: null,
          last_posted: null
        });
      }

      this.my_followers = formatted_us;

      var formatted_us = [];
      for (var i = 0; i < this.iam_following.length; i++) {
        //console.log(results[i]);

        formatted_us.push({
          user_id: this.iam_following[i].attrs.user_id,
          profile_pic: null,
          last_posted: null
        });
      }

      this.iam_following_formatted = formatted_us;
      this.my_followers_temp = this.my_followers;
      this.iam_following_formatted.forEach(o =>
        this.loadProfilePic(o.user_id, this.iam_following)
      );

      this.iam_following_formatted.forEach(o =>
        this.loadLastPosted(o.user_id, this.iam_following_formatted)
      );

      // this.my_followers1.forEach(o => this.loadProfilePic(o.user_id, this.my_followers1));
      this.my_followers_temp.forEach(o =>
        this.loadProfilePic(o.user_id, this.my_followers_temp)
      );

      this.my_followers_temp.forEach(o =>
        this.loadLastPosted(o.user_id, this.my_followers_temp)
      );

      this.sort();
    },
    async fetchData() {
      configure(this.RADIKS_SERVER);
      this.assignVals(true);
    },

    fetchDataNoUpdate() {
      this.assignVals(false);
    },

    isExistsinFollowing(user_id) {
      //   console.log(this.temp_iam_following);

      for (var k in this.temp_iam_following) {
        if (user_id == this.temp_iam_following[k].attrs.user_id) return true;
      }
      return false;
    },
    isExistsinUndo(user_id) {
      for (var k in this.unfollwed_undo) {
        if (user_id == this.unfollwed_undo[k]) return true;
      }
      return false;
    },

    getBubbleCount() {
      this.$http.get("/bubble").then(
        response => {
          if (parseInt(response.data) > 0) $(".bubble").html(response.data);

          //alert('ss')
          // success callback
        },
        response => {
          // error callback
        }
      );
    },
    follow: async function(id) {
      this.posting.push(id);

      const follow = new Following({
        user_id: id,
        followed_by: this.current_user.username
      });
      await follow.save();

      this.fetchData();
      this.posting = this.posting.filter(e => e !== id);

      // success callback
    },

    unfollow: function(id) {
      console.log(id);

      // this.$http.post("/unfollow", formData).then(
      //   response => {
      //     this.fetchData();
      //   },
      //   response => {}
      // );
    },

    ///will unfollow, but will not update the  following list.. instead will into a temp undo array ..
    unfollowNoUpdate: async function(id) {
      //  $.post('unfollow',  )

      var rec = await Following.findOne({
        user_id: id,
        followed_by: this.current_user.username
      });

      await rec.destroy();
      this.unfollwed_undo.push(id);
      this.fetchDataNoUpdate();
      return false;
    },
    loadLastPosted: async function(user_id, target) {
      //var pf = await this.blockstack.lookupProfile(user_id);
      var rec = await Question.findOne({
        user_id: user_id,
        limit: 1,
        sort: "-createdAt"
      });

      target
        .filter(o => o.user_id === user_id)
        .forEach(o => {
          if (rec && rec.attrs.createdAt) {
            o.last_posted =
              "last posted a question " +
              moment.unix(rec.attrs.createdAt / 1000).fromNow() +
              "..";
          } else {
            o.last_posted = "No Questions posted yet!";
          }
        });
    },

    followNoUpdate: async function(id, event) {
      //for loader
      this.posting.push(id);
      const follow = new Following({
        user_id: id,
        followed_by: this.current_user.username
      });
      await follow.save();

      this.fetchDataNoUpdate();

      //this.unfollwed_undo.push(id)
      this.unfollwed_undo = this.unfollwed_undo.filter(e => e !== id);
      this.posting = this.posting.filter(e => e !== id);
    }
  }
};
</script>
