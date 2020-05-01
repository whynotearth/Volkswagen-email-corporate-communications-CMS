<template>
  <div class="flex flex-col items-center text-center px-4 my-6">
    <div>
      <h2>Hi Xavier, here's your Jumpstart email for the day.</h2>
    </div>
    <div class="my-4 px-6">
      Image Component will be replaced here
    </div>
    <div>
      <h2 class="tg-h2-mobile text-primary">Daily Email will automatically send in</h2>
      <div class="counter tg-h2-mobile my-2 text-center">
        <BaseCounter date="Jan 5, 2021 15:37:25" />
      </div>
    </div>
    <div>
      <BaseButton>REVIEW AND SEND</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton';
import BaseCounter from './BaseCounter';

export default {
  name: 'Today Email',
  components: { BaseButton, BaseCounter }
};
</script>

<style scoped></style>
