<template>

  <div >


  <header class="landing_header relative">
<div class="mw6 m-auto landing_header__inner flex items-center top__header relative  pr15 pl15">
 <div class="logoTitle__container flex">
   <span class="landing__logo fc">
   <a class="dib"   href="/">
   <img width="22" height="22" src="./assets/img/main-logo.svg" alt="Pgeon">
   </a>
   </span>
   <a class="openQuestion__title">
     <span>
        Open Questions
     </span>
     <span class="dropdown__icon ml5p fc">

       <img  src="./assets/img/svg/chevron-down.svg" />
     </span>
   </a>
 </div>



   <!-- <span class="header-right__icons">
     <a href="/people" class="db header-followers pointer mr20p fc">
     <img  src="./assets/img/svg/followers.svg" />



     </a>
     <a href="/notifications" class="header-bell pointer mr20p fc">
       <span class="flex items-center relative">
         <span class="bell-notification-dot"></span>
         <img  src="./assets/img/svg/bell.svg" />

       </span>
     </a>

     <span  class="profile__image pointer slide-menu__trigger fc">

       <div class="avatar-dummy-h"> </div>


     </span>
   </span> -->

   <a  class="login__links">
   <img v-if="loading" width="22" height="22" src="./assets/img/svg/loading.svg" alt="Pgeon">

        <profile v-else-if="user" :user="user"></profile>
      <login v-else></login>

          <!-- <profile v-if="user" :user="user"></profile> -->

   </a>
</div>



<!-- <div class="mobile-dropdown m-auto mw6">

 <a class="pointer {{strstr(Request::url(), "responses")? '': 'active'}}" href="/">
   <span>
     Open Questions
   </span>
   {{strstr(Request::url(), "responses")? '': Helper::read_svg("img/svg/check.svg")}}



 </a>
 <a class="pointer {{strstr(Request::url(), "responses")? 'active': ''}}" href="/responses" >
   <span>
     Published Responses
   </span>

   {{strstr(Request::url(), "responses")? Helper::read_svg("img/svg/check.svg"):'' }}
 </a>


   @if (Auth::check())
    @if (Auth::user()->role_id != 3 )
    <a href="/" class="myQuestion-premium-button" >
      <span>
        My Questions
      </span>


      <div class="fc premium-dropdown-item">
        <span class="premium-lock fc">
        {{Helper::read_svg("img/svg/lock-alt.svg")}}

          <span class="ml5p">Premium</span>
        </span>



      </div>

    </a>
    @else
    <a href="/my-questions">
      <span>
        My Questions
      </span>

    </a>
   @endif
   @endif

</div> -->
</header> 

 
    <router-view/>


        <profile-menu v-if="user" :user="user"></profile-menu>

  </div>
</template>



<script>

import { configure } from 'radiks';
import { User } from 'radiks';
import login from './components/Login.vue'
import profile from './components/Profile.vue'
import ProfileMenu from './components/ProfileMenu.vue'


export default {
  name: 'app',
  components: {login, profile,ProfileMenu},
  //async
  async mounted () {
    //this.blockstack.signUserOut(window.location.href)
    const blockstack = this.blockstack

    // blockstack.listFiles(function (data) {
    //     console.log('test');
        
    //     console.log(data);
    //     console.log('test');
    // })

    configure(this.RADIKS_SERVER);

    if (blockstack.isUserSignedIn()) {
      this.userData = blockstack.loadUserData()
      this.user = new blockstack.Person(this.userData.profile)
      this.user.username = this.userData.username
    } else if (blockstack.isSignInPending()) {
        this.loading = true;

       await blockstack.handlePendingSignIn();
       await User.createWithCurrentUser();
       window.location = window.location.origin

      // blockstack.handlePendingSignIn()
      // .then((userData) => {
      //   User.createWithCurrentUser()
      //   .then((userData) => {
      //       window.location = window.location.origin
      //   })
        
      // })
    }
  },
  data () {
    return {
      blockstack: window.blockstack,
      user: null,
      loading: false
    }
  }
}
</script>

<style src="./assets/css/index.scss" lang="scss"></style>
