<template>

<span href="/user/profile-with-feeds" class="profile__image pointer slide-menu__trigger fc">
					                  <img :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'" class="avatar">
        </span>

   
</template>

<script>

export default {
  props: ['user'],
  }
</script>

