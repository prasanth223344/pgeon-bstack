<template>
  <div class="hello">
    <div>
      <h1>Pgeonl</h1>
      <button class="btn btn-default" @click.prevent="signIn">Sign In With Blockstack</button>
    </div>
  </div>
</template>

<script>


export default {
  name: 'landing',
  data () {
    return {
      blockstack: window.blockstack
    }
  },
  created () {
  
  },

  methods: {
    signIn () {
      const blockstack = this.blockstack
      window.location = window.location.origin
      const origin = window.location.origin

      blockstack.redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
