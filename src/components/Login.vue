<template>
  <span class="btn btn-default" @click.prevent="signIn">Sign In With Blockstack</span>
</template>

<script>
import { UserSession, AppConfig } from "blockstack";

export default {
  data() {
    return {
      blockstack: window.blockstack
    };
  },

  methods: {
    signIn() {
      // const session = new UserSession({
      //   appConfig: new AppConfig(["store_write", "publish_data"])
      // });

      // configure({
      //   apiServer: this.RADIKS_SERVER,
      //   session
      // });


          this.$root.userSession.redirectToSignIn()

      //window.location = window.location.origin
      const origin = window.location.origin;

      //session.redirectToSignIn(origin, origin + "/manifest.json", [
      //  "store_write",
     //   "publish_data"
     // ]);

  

      // const blockstack = this.blockstack
      // window.location = window.location.origin
      // const origin = window.location.origin

      // blockstack.redirectToSignIn(origin, origin+ '/manifest.json', ['store_write', 'publish_data'])
    }
  }
};
</script>

