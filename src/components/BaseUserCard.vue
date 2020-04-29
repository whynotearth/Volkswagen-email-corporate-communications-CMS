<template>
  <div class="user-card--background pt-10">
    <div class="flex flex-col items-center justify-center">
      <UserAvatar
        :src="'https://www.callart.com.tr/public/assets/img/blog/avatar.png'"
        :alt="'user-image'"
      />
      <h1 class="user-avatar__name my-2">Xavier Jasso</h1>
    </div>
    <EmailInfoBox />
  </div>
</template>

<script>
import UserAvatar from './BaseUserAvatar';
import EmailInfoBox from './UserEmailInfoBox';

export default {
  name: 'UserCard',
  components: { UserAvatar, EmailInfoBox }
};
</script>

<style scoped>
  .user-card--background {
    background: radial-gradient(50% 49.2% at 0% 0.8%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%), #011D51;
  }

  h1.user-avatar__name {
    font-family: Work Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 38px;
    color: #FFFFFF;
    opacity: .84;
  }
</style>
