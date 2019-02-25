<template>

					      <span class="btn btn-default" @click.prevent="signIn">Sign In With Blockstack</span>

</span>
   
</template>

<script>


export default {
  data () {
    return {
      blockstack: window.blockstack
    }
  },


  methods: {
    signIn () {
      const blockstack = this.blockstack
      window.location = window.location.origin
      const origin = window.location.origin

//alert(origin+ '/manifest.json')


      blockstack.redirectToSignIn(origin, origin+ '/manifest.json', ['store_write', 'publish_data'])
    }
  }
}
</script>

