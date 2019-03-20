  <template>
  <div class="people-header">

 <header class="landing_header relative">
<div class="mw6 m-auto landing_header__inner flex items-center top__header relative  pr15 pl15">


<span class="back-arrow dib">
            <a href="/" class="dib">   <img width="22" height="22" src="../../assets/img/svg/long-arrow-left.svg">

            </a>
        </span>




    
   <span class="header-right__icons">
     <a href="/people" class="db header-followers pointer mr20p fc">
     
     <img width="22" height="22" src="../../assets/img/svg/followers.svg">

     </a>
     <a href="/notifications" class="header-bell  pointer mr20p fc">
       <span class="flex items-center relative">
         <span class="bell-notification-dot"></span>
              <img width="22" height="22" src="../../assets/img/svg/bell.svg">


       </span>
     </a>
   
     <span href="/user/profile-with-feeds" class="profile__image pointer slide-menu__trigger fc">
            <avatar :size="32" :src="profile_pic" :username="current_user.username"></avatar>

     </span>
   </span>

</div>




</header>
        <profile-menu v-if="current_user" ></profile-menu>


     </div>
</template>

<script>

import { configure } from "radiks";
import { User } from "radiks"; 
import Avatar from "vue-avatar";
import { BlockstackMixin } from "../../mixins/BlockstackMixin.js";

import ProfileMenu from '../ProfileMenu.vue'

export default {
  name: "app",
  components: { Avatar, ProfileMenu },
  mixins: [BlockstackMixin],


  //async
  async mounted() {

    
    configure(this.RADIKS_SERVER);


   

    
    


 
  },
  data() {
    return {
    };
  }
};
</script>