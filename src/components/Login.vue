<template>
  <div class="mw6 m-auto">
    <header class="flex items-center top__header pl-10 pr-20 relative">
      <span class="logo flex justify-center items-center">
                <router-link class="dib" :to="{ path: '/' }"> 

          <img width="22" height="22" src="../assets/img/main-logo.svg">
         </router-link>
      </span>

      <span class="close-button fc">
        <router-link class="fc" :to="{ path: '/' }"> 
          <img width="22" height="22" src="../assets/img/svg/times.svg">
        </router-link>
      </span>
    </header>

    <div class="signup-group">
      <div class="row mlr38 tc">
        <a
          class="db pg-btn pointer cw-fb flex items-center justify-center login__btn"  @click.prevent="signIn"
         
        >
          <div class="dib flex items-center w6">
            <span >
              <svg fill="none" style="width:23px" class="sc-bdVaJa bqFlkF">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.246737 1.80856C-8.9407e-08 2.37873 -6.34997e-08 3.10582 0 4.56L2.37855e-07 10L4.75644e-07 15.44C5.39209e-07 16.8942 5.66244e-07 17.6213 0.246737 18.1914C0.549777 18.8917 1.10827 19.4502 1.80856 19.7533C2.37873 20 3.10582 20 4.56 20H10H15.44C16.8942 20 17.6213 20 18.1914 19.7533C18.8917 19.4502 19.4502 18.8917 19.7533 18.1914C20 17.6213 20 16.8942 20 15.44V10V4.56C20 3.10582 20 2.37873 19.7533 1.80856C19.4502 1.10827 18.8917 0.549775 18.1914 0.246736C17.6213 -1.04308e-07 16.8942 -6.34997e-08 15.44 0L10 2.37855e-07L4.56 4.75645e-07C3.10582 5.39209e-07 2.37873 5.66244e-07 1.80856 0.246736C1.10827 0.549778 0.549777 1.10827 0.246737 1.80856ZM13.1928 8.61608C12.1947 8.61608 11.3854 7.80681 11.3854 6.80852C11.3854 5.81073 12.1947 5.00146 13.1928 5.00146C14.1908 5.00146 15.0001 5.81073 15.0001 6.80852C15.0001 7.80681 14.1908 8.61608 13.1928 8.61608ZM8.61312 6.80834C8.61312 7.80596 7.80422 8.61489 6.80637 8.61489C5.80902 8.61489 5.00012 7.80596 5.00012 6.80834C5.00012 5.81072 5.80902 5.00179 6.80637 5.00179C7.80422 5.00179 8.61312 5.81072 8.61312 6.80834ZM13.1929 11.391C12.1946 11.391 11.3854 12.2003 11.3854 13.1983C11.3854 14.1964 12.1946 15.0057 13.1929 15.0057C14.1907 15.0057 15 14.1964 15 13.1983C15 12.2003 14.1907 11.391 13.1929 11.391ZM6.80653 11.3927C7.80414 11.3927 8.61305 12.2016 8.61305 13.1995C8.61305 14.1968 7.80414 15.0057 6.80653 15.0057C5.80892 15.0057 5 14.1968 5 13.1995C5 12.2016 5.80892 11.3927 6.80653 11.3927Z"
                  fill="currentColor"
                ></path>
              </svg>

              Connect with Blockstack
            </span>
          </div>
        </a>
      </div>
    </div>

    <div class="ah-login tc mt50p">
      <p>
        New to Blockstack?
        <a target="_blank" href="https://blockstack.org">Learn More</a>
      </p>
    </div>
  </div>
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
      this.$root.userSession.redirectToSignIn();

      const origin = window.location.origin;
    }
  },
  mounted() {}
};
</script>

