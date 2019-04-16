  <template>
  <div>
    <header class="landing_header relative">
      <div
        class="mw6 m-auto landing_header__inner flex items-center top__header relative pr15 pl15"
      >
        <div class="logoTitle__container flex">
          <span class="landing__logo fc">
            <router-link :to="{ path: '/' }" class="dib">
              <img width="22" height="22" src="../../assets/img/main-logo.svg" alt="Pgeon">
            </router-link>
          </span>
          <a class="openQuestion__title" v-if="$route.path == '/'">
            <span>Open Questions</span>
            <span class="dropdown__icon ml5p fc">
              <img src="../../assets/img/svg/chevron-down.svg">
            </span>
          </a>
          <a class="openQuestion__title" v-else>
            <span>Published Responses</span>
            <span class="dropdown__icon ml5p fc">
              <img src="../../assets/img/svg/chevron-down.svg">
            </span>
          </a>
        </div>

        <img
          v-if="loading"
          width="22"
          height="22"
          src="../../assets/img/svg/loading.svg"
          alt="Pgeon"
        >
        
        <span class="header-right__icons" v-else-if="current_user">
          <router-link :to="{ path: 'people' }" class="db header-followers pointer mr20p fc">
            <img width="22" height="22" src="../../assets/img/svg/followers.svg">
          </router-link>

          <a href="/notifications" class="header-bell pointer mr20p fc">
            <span class="flex items-center relative">
              <span class="bell-notification-dot"></span>
              <img width="22" height="22" src="../../assets/img/svg/bell.svg">
            </span>
          </a>
          
          <span class="profile__image pointer slide-menu__trigger fc">
            <avatar :size="32" :src="profile_pic" :username="current_user.username"></avatar>
          </span>
        </span>
        <login v-else></login>
      </div>

      <div class="mobile-dropdown m-auto mw6">
       
       
        <router-link class="pointer" v-bind:class="{ active: $route.path == '/' }" :to="{ path: '/'  }">
          <span>Open Questions</span>
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" v-if="$route.path == '/'">
            <path
              d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
            ></path>
          </svg>
        </router-link>


        <router-link :to="{ path: '/responses'  }" class="pointer" v-bind:class="{ active: $route.path == '/responses' }">
          <span>Published Responses</span>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" v-if="$route.path == '/responses'">
            <path
              d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
            ></path>
          </svg>
        </router-link>

        </span>
        


        <router-link
          :to="{ path: '/my-questions'  }"
          class="myQuestion-premium-button"
          v-if="current_user"
        >
          <span>My Questions</span>
        </router-link>
      </div>
    </header>

    <profile-menu v-if="user" :user="user"></profile-menu>
  </div>
</template>

<script>
// import { User } from "radiks";
import Avatar from "vue-avatar";
import login from "../Login.vue";
import ProfileMenu from "../ProfileMenu.vue";
import { configure, User, getConfig } from "radiks";
import { UserSession, AppConfig } from "blockstack";

import { BlockstackMixin } from "../../mixins/BlockstackMixin.js";

export default {
  name: "app",
  components: { login, ProfileMenu, Avatar },
  mixins: [BlockstackMixin],

  //async
  async mounted() {
    jQuery(".openQuestion__title").on("click", e => {
      const $header = jQuery(".landing_header");
      const open = $header.hasClass("dropdown--active");
      open ? this.closeDropdown() : this.openDropdown();
    });



    const { userSession } = getConfig();
    const blockstack = this.blockstack;

    if (userSession && userSession.isUserSignedIn()) {
      this.userData = userSession.loadUserData();
      this.user = new blockstack.Person(this.userData.profile);
      this.user.username = this.userData.username;
    } else if (userSession && userSession.isSignInPending()) {
      this.loading = true;
      await userSession.handlePendingSignIn();
      await User.createWithCurrentUser();
      if(this.$cookies.get('redirect_to')) {
        var red = this.$cookies.get('redirect_to')
          this.$cookies.remove('redirect_to');
          window.location = red
      }else {
           window.location = window.location.origin;
      }
     
    }

    // const blockstack = this.blockstack;

    // configure(this.RADIKS_SERVER);

    // if (blockstack.isUserSignedIn()) {
    //   this.userData = blockstack.loadUserData();
    //   this.user = new blockstack.Person(this.userData.profile);
    //   this.user.username = this.userData.username;
    // } else if (blockstack.isSignInPending()) {
    //   this.loading = true;

    //   await blockstack.handlePendingSignIn();
    //   await User.createWithCurrentUser();
    //   window.location = window.location.origin;

    //}
  },
  data() {
    return {
      blockstack: window.blockstack,
      user: null,
      loading: false
    };
  },
  methods: {
    closeDropdown: function() {
      const $header = jQuery(".landing_header");
      $header.removeClass("dropdown--active");
    },

    openDropdown: function() {
      const $header = jQuery(".landing_header");
      $header.addClass("dropdown--active");
    }
  }
};
</script>