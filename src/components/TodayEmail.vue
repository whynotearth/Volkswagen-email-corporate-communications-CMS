<template>
  <div class="px-4 my-6">
    <div>
      <h2>Hi Xavier, here's your Jumpstart email for the day.</h2>
    </div>
    <div class="my-4 px-6">
      Image Component will be replaced here
    </div>
    <div>
      <h2>Daily Email will automatically send in</h2>
      <div class="counter my-2">
        <BaseCounter :date="new Date('Jun 20, 2021 20:20:20')" />
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
  name: 'Todays Email',
  components: { BaseButton, BaseCounter }
};
</script>

<style scoped>
h2,
.counter {
  font-family: Work Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  color: #011d51;
}
</style>
