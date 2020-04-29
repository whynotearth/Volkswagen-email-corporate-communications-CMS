<template>
  <div class="grid grid-flow-col mx-4">
    <UserEmailInfoBoxItem
      :emailInfo="{
        name: 'Opens',
        total: 367
      }"
    />
    <UserEmailInfoBoxItem
      :emailInfo="{
        name: 'Open Rate',
        total: 142
      }"
      classes="email-info-middle-item--border mx-2 px-2"
    />
    <UserEmailInfoBoxItem
      :emailInfo="{
        name: 'Clicks',
        total: 76
      }"
    />
  </div>
</template>

<script>
import UserEmailInfoBoxItem from './UserEmailInfoBoxItem';

export default {
  name: 'UserEmailInfoBox',
  components: { UserEmailInfoBoxItem }
};
</script>

<style>
.email-info-middle-item--border {
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: rgba(255, 255, 255, 0.18);
}
</style>
