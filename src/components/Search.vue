<template>
  <div>
    <headerwithback></headerwithback>

    <div class="bgw">
      <div class="search-view mw6 m-auto pr15 pl15">
        <span class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"
            ></path>
          </svg>
        </span>
        <form role="search" v-on:submit.prevent="search" class="w100p">
          <input
            autofocus
            placeholder="Search by name"
            type="text"
            class="search-input caret-primary w100p"
            v-model="q"
          >
        </form>
        <a class="search-close" href="/people/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              d="M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z"
            ></path>
          </svg>
        </a>
      </div>
    </div>

    <main class="mw6 m-auto people-main pl15p pr15p pt30p dn">
      <div class="search-header">
        <h2 class="m0">Recently Searched</h2>
        <button>Clear Search</button>
      </div>
      <h4 class="search-item">sds</h4>
    </main>

    <main class="mw6 m-auto people-main pl15p pr15p pt10p">
      <div v-if="results.length > 0" class="people-item" v-for="user in results">
        <div>
          <avatar :size="42" :src="user.profile_pic" :username="user.user_id"></avatar>

          <div class="people-item__info">
            <h4>{{user.username}}</h4>
            <span>$value['obj']->last_posted</span>
          </div>
        </div>
        <button class="follow-button follow" v-on:click="follow(user.user_id)">
          <span>Follow</span>
          <!-- following is the `active` state -->
        </button>
      </div>
      <div v-else class="empty-notifications">
        <p class="m0">
          <span>👽</span>
          <span>uh oh! Looks like you searched
            <br>for a mystery human!
          </span>
        </p>
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
import {FollowMixin} from "../mixins/FollowMixin.js";


export default {
  data: function() {
    return {
      results: {},
      axios: window.axios,
      q: null
    };
  },
  mounted() {
    //   console.log('Component mounted.')
  },
  created: function() {
    //only the first time all update..from there only update the my_followers..I_am_follwogin left intact for undo purpose
  },
  components: {
    Avatar,
    Headerwithback
  },
  mixins: [BlockstackMixin, FollowMixin],

  methods: {
    loadProfilePic: async function(user_id) {
      var pf = await this.blockstack.lookupProfile(user_id);
      this.results
        .filter(o => o.user_id === user_id)
        .forEach(o => {
          if (
            pf &&
            typeof pf.image !== "undefined" &&
            pf.image[0]["contentUrl"]
          ) {
            o.profile_pic = pf.image[0]["contentUrl"];
          }
        });
    },

    async search() {
      if (this.q) {
        var results = [];
        this.users = await axios.get(
          `search/${this.current_user.username}/${this.q}/`
        );
        results = this.users.data;
        console.log(results);

        var formatted_us = [];
        for (var i = 0; i < results.length; i++) {
          //console.log(results[i]);

          formatted_us.push({
            user_id: results[i]._id,
            username: results[i].username,
            profile_pic: null
          });
        }

        console.log(formatted_us);

        this.results = formatted_us;
        //  console.log(this.results);

        this.results.forEach(o => this.loadProfilePic(o.user_id));
      }

      

      //usernames

      //configure(this.RADIKS_SERVER);

      // configure(this.RADIKS_SERVER);

      // this.users = await User.fetchList(
      //   { username: this.current_user.username },
      //   { decrypt: false }
      // );

      // this.temp_iam_following = this.iam_following = await Following.fetchList(
      //   { followed_by: this.current_user.username },
      //   { decrypt: false }
      // );
      // this.iam_following_count = this.iam_following_count.length;
      // this.my_followers_count = this.my_followers_count.length;
      // this.sort();
    }
  }
};
</script>
