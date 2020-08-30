<template>
  <div>
    <header class="live-header">
      <div class="mw6 m-auto flex items-center pl15p justify-between top__header pl-15 pr15">
        <span class="back-arrow dib">
          <a v-on:click="goBack()" class="dib">
            <img width="22" height="22" src="../assets/img/svg/long-arrow-left.svg">
          </a>
        </span>

        <span class="header-title live-title">Preferences</span>
      </div>
    </header>

    <main class="preferences-main" v-if="records_loaded">
      <section class="preferences-section mb20p">
        <h2 class="preferences-section__header pl15 mw6">Notifications</h2>

        <div class="preferences-section__item">
          <div class="mw6 m-auto">
            <span>When someone I follow posts a question</span>

            <input
              type="checkbox"
              class="switch-toggle-input dn"
              id="when-follwed-post"
              @change="toggle1()"
              :checked="someone_i_followed_posted"
              
            >
            <label class="switch-toggle" for="when-follwed-post">
              <span class="switch-toggle__inner"></span>
            </label>
          </div>
          <span class="m-auto mw6 db">
            <div class="border-trimmed"></div>
          </span>
        </div>

        <div class="preferences-section__item">
          <div class="mw6 m-auto">
            <span>When my submitted response is selected</span>

            <input
              type="checkbox"
              class="switch-toggle-input dn"
              id="when-submitted-selected"
              @change="toggle2()"
              :checked="my_response_selected"

            >
            <label class="switch-toggle" for="when-submitted-selected">
              <span class="switch-toggle__inner"></span>
            </label>
          </div>
          <span class="m-auto mw6 db">
            <div class="border-trimmed"></div>
          </span>
        </div>

        <div class="preferences-section__item">
          <div class="mw6 m-auto">
            <span>When my response receives points</span>

            <input
              type="checkbox"
              class="switch-toggle-input dn"
              id="when-respoonse-recieve-points"
              @change="toggle3()"
              :checked="my_response_got_points"
            >
            <label class="switch-toggle" for="when-respoonse-recieve-points">
              <span class="switch-toggle__inner"></span>
            </label>
          </div>
          <span class="m-auto mw6 db">
            <div class="border-trimmed"></div>
          </span>
        </div>
      </section>

      <section class="preferences-section mb20p">
        <h2 class="preferences-section__header pl15 mw6">Emails</h2>
        <div class="preferences-section__item">
          <div class="mw6 m-auto">
            <span>For Pgeon News and Updates</span>

            <input
              type="checkbox"
              class="switch-toggle-input dn"
              id="news-updates"
              @change="toggle4()"
              :checked="subscribed_to_newsletter"
            >
            <label class="switch-toggle" for="news-updates">
              <span class="switch-toggle__inner"></span>
            </label>
          </div>
          <span class="m-auto mw6 db">
            <div class="border-trimmed"></div>
          </span>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Preference from "../models/Preference";
import { BlockstackMixin } from "../mixins/BlockstackMixin.js";
import { NavMixin } from "../mixins/NavMixin.js";
import Avatar from "vue-avatar";

import { configure } from "radiks";
import moment from "moment";

export default {
  data: function() {
    return {
      someone_i_followed_posted: false,
      my_response_selected: false,
      records_loaded: false,
      subscribed_to_newsletter: false,
      my_response_got_points: false,
      id: null
    };
  },
  //votecount will be inc'ted or dec'ted when the user cast a vote..but accurate vote can be viewed only on page refresh

  mixins: [BlockstackMixin, NavMixin],

  mounted() {},

  computed: {},
  watch: {},
  methods: {
    toggle1() {
      this.someone_i_followed_posted = !this.someone_i_followed_posted;
      this.save();
    },
    toggle2() {
      this.my_response_selected = !this.my_response_selected;
      this.save();
    },
    toggle3() {
      this.my_response_got_points = !this.my_response_got_points;
      this.save();
    },
    toggle4() {
      this.subscribed_to_newsletter = !this.subscribed_to_newsletter;
      this.save();
    },

    async save() {
     
      console.log(this.someone_i_followed_posted);
      console.log(this.my_response_selected);
      console.log(this.subscribed_to_newsletter);
      console.log(this.my_response_got_points);

      var atts = {
        someone_i_followed_posted: this.someone_i_followed_posted,
        my_response_selected: this.my_response_selected,
        subscribed_to_newsletter: this.subscribed_to_newsletter,
        my_response_got_points: this.my_response_got_points
      };

      console.log(atts);

      if (!this.id) {
        const preference = new Preference(atts);
        await preference.save();
        this.fetchRecords();
      } else {
        const preference = await Preference.findById(this.id);
        preference.update(atts);
        await preference.save();
      }
    },
    async fetchRecords() {
      var preference = await Preference.fetchList({  user_id : this.current_user.username
      });

      console.log(preference[0]);

      if (preference[0] && preference[0]._id) {
        this.id = preference[0]._id;

        this.someone_i_followed_posted =
          preference[0].attrs.someone_i_followed_posted;
        this.my_response_selected = preference[0].attrs.my_response_selected;
        this.subscribed_to_newsletter =
          preference[0].attrs.subscribed_to_newsletter;
        this.my_response_got_points =
          preference[0].attrs.my_response_got_points;
        
        
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
  },
  mounted: function() {}
};
</script>
