<template>
  <div class="pt-10">
    <div class="flex flex-col items-center justify-center">
      <UserAvatar :src="'https://www.callart.com.tr/public/assets/img/blog/avatar.png'" :alt="'user-image'" />
      <h1 class="tg-h1-mobile em-high text-white my-2">Xavier Jasso</h1>
    </div>
  </div>
</template>

<script>
import UserAvatar from './BaseUserAvatar';

export default {
  name: 'UserCard',
  components: { UserAvatar }
};
</script>
