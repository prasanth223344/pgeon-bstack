<template>
  <div class="slide-menu__outer">
    <aside class="slide-menu upperbg__color">
      <div class="mw6 m-auto">
        <header>
          <span class="slide-menu__close pointer">
            <img src="../assets/img/svg/times.svg">
          </span>
        </header>

        <div class="profile-preview mt15p">
          <div class="iframe-container">
            <img
              :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'"
              class="avatar"
            >
          </div>
          <h1>{{ user.name() ? user.name() : 'Nameless Person'}}</h1>
          <div class="profile-url">
            <p class="m0 flex">
              <span class="flex1">www.pgeon.com/</span>
              <input class="user-slug-input" value disabled>
            </p>

            <span class="edit-icon">
              <div class="edit-icon-pencil">
                <img src="../assets/img/svg/pencil.svg">
              </div>
              <div class="edit-icon-times">
                <img src="../assets/img/svg/times.svg">
              </div>
            </span>
          </div>
        </div>
      </div>
      <div class="pt24p">
        <ul class="ul-ls">
          <li>
            <a href="my-account" class="mw6 m-auto pl15 pr15">
              <span>My Account</span>
              <img src="../assets/img/svg/chevron-right.svg">
            </a>
            <span class="m-auto mw6 db">
              <div class="border-trimmed"></div>
            </span>
          </li>

          <li>
            <a href="/preferences" class="mw6 m-auto pl15 pr15">
              <span>Preferences</span>
              <img src="../assets/img/svg/chevron-right.svg">
            </a>
            <span class="m-auto mw6 db">
              <div class="border-trimmed"></div>
            </span>
          </li>

       
          <li class="ul-ls--last">
            <a
              class="mw6 m-auto pl15 pr15" @click.prevent="signOut">
              <span>Logout</span>
            </a>
            
            <span class="m-auto mw6 db">
              <div class="border-trimmed"></div>
            </span>
          </li>
        </ul>
      </div>
    </aside>

    <div class="select-image">
      <div class="select-image__overlay standard-overlay"></div>
      <div class="select-image__inner mw6 m-auto">
        <div class="select-image__header">
          <span></span>
          <h3>Change Profile Photo</h3>
        </div>
        <div class="select-image__body">
          <div class="select-image__seperator"></div>

          <div class="select-image__item select-image__item--camera">
            <h3>Take Photo</h3>
          </div>
          <div class="select-image__seperator"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
    data () {
    return {
      blockstack: window.blockstack,
  
    }
  },

  mounted() {
    $(".slide-menu__trigger").on("click", () => {
      $("body").css("overflow", "hidden")
      $("body").addClass("slide-menu--active")
    })


    $(".slide-menu__close").on("click", () => {
      $("body").css("overflow", "auto")
      $("body").removeClass("slide-menu--active")
    })
    
  },

  methods: {
    signOut() {
      this.blockstack.signUserOut(window.location.href);
    }
  }
};
</script>

