  <template>
  <div>
    <header class="landing_header relative">
      <div
        class="mw6 m-auto landing_header__inner flex items-center top__header relative pr15 pl15"
      >

        <span class="back-arrow dib">
                    <a v-on:click="goBack()" class="left-arrow fc">

          <!-- <a v-on:click="goBack()" > -->
            <img width="22" height="22" src="../../assets/img/svg/long-arrow-left.svg">
          </a>
        </span>
        
        <span class="header-right__icons">

          <router-link class="db header-followers pointer mr20p fc"  :to="{ path: '/people' }" >
            <img width="22" height="22" src="../../assets/img/svg/followers.svg">
          </router-link>
                    <router-link class="header-bell pointer mr20p fc"  v-bind:class="{ 'header-bell--with-notif': notif_count }"  :to="{ path: '/notifications' }">

            <span class="flex items-center relative">
              <span class="bell-notification-dot"></span>
              <img width="22" height="22" src="../../assets/img/svg/bell.svg">
            </span>
          </router-link>
          
          <span
            class="profile__image pointer slide-menu__trigger fc"
          >
            <avatar :size="32" :src="profile_pic" :username="current_user.username"></avatar>
          </span>
        </span>
      </div>
    </header>
    <profile-menu v-if="current_user"></profile-menu>
  </div>
</template>

<script>
import { configure } from "radiks";
import { User } from "radiks";
import Avatar from "vue-avatar";
import { BlockstackMixin } from "../../mixins/BlockstackMixin.js";
import { NavMixin } from "../../mixins/NavMixin.js";
import { NotificationMixin } from "../../mixins/NotificationMixin.js";

import ProfileMenu from "../ProfileMenu.vue";

export default {
  name: "app",
  components: { Avatar, ProfileMenu },
  mixins: [BlockstackMixin, NavMixin, NotificationMixin],

  //async
  async mounted() {
    configure(this.RADIKS_SERVER);
  },
  data() {
    return {};
  }
};
</script>