  <template>
  <div>
    <header class="landing_header relative">
      <div
        class="mw6 m-auto landing_header__inner flex items-center top__header relative pr15 pl15"
      >
        <div class="logoTitle__container flex">
          <span class="landing__logo fc">
             <router-link :to="{ path: '/' }" class="dib" >
              <img width="22" height="22" src="../../assets/img/main-logo.svg" alt="Pgeon">
            </router-link>

          </span>
          <a class="openQuestion__title">
            <span>Open Questions</span>
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
          
          <span
            class="profile__image pointer slide-menu__trigger fc"
          >
            <avatar :size="32" :src="profile_pic" :username="current_user.username"></avatar>
          </span>
        </span>
        <login v-else></login>
      </div>
    </header>

    <profile-menu v-if="user" :user="user"></profile-menu>
  </div>
</template>

<script>
import { configure } from "radiks";
import { User } from "radiks";
import Avatar from "vue-avatar";
import login from "../Login.vue";
import ProfileMenu from "../ProfileMenu.vue";
import { BlockstackMixin } from "../../mixins/BlockstackMixin.js";

export default {
  name: "app",
  components: { login, ProfileMenu, Avatar },
  mixins: [BlockstackMixin],

  //async
  async mounted() {
    const blockstack = this.blockstack;


    configure(this.RADIKS_SERVER);

    if (blockstack.isUserSignedIn()) {
      this.userData = blockstack.loadUserData();
      this.user = new blockstack.Person(this.userData.profile);
      this.user.username = this.userData.username;
    } else if (blockstack.isSignInPending()) {
      this.loading = true;

      await blockstack.handlePendingSignIn();
      await User.createWithCurrentUser();
      window.location = window.location.origin;

      // blockstack.handlePendingSignIn()
      // .then((userData) => {
      //   User.createWithCurrentUser()
      //   .then((userData) => {
      //       window.location = window.location.origin
      //   })

      // })
    }
  },
  data() {
    return {
      blockstack: window.blockstack,
      user: null,
      loading: false
    };
  }
};
</script>