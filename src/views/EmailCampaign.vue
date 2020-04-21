<template>
  <div>
    <AppBarHeader :title="'Email Campaign'" :to-link="'/settings'" />
    <div class="flex items-strech items-center shadow-sm px-4 py-3">
      <router-link
        to="/email/list"
        class="link-fordward block flex-grow justify-between flex h-full items-center font-semibold cursor-pointer select-none"
      >
        <span class="mr-2 settingsOptions">Manage Email Lists</span>
        <svg
          class="transform -scale-x-1"
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.4 1.4L6 0L0 6L6 12L7.4 10.6L2.8 6L7.4 1.4Z"
            fill="currentColor"
          />
        </svg>
      </router-link>
    </div>
    <div class="flex items-strech items-center shadow-sm px-4 py-3">
      <router-link
        to="/email/list"
        class="link-fordward block flex-grow justify-between flex h-full items-center font-semibold cursor-pointer select-none"
      >
        <span class="mr-2 settingsOptions">Set Default Email Time</span>
        <svg
          class="transform -scale-x-1"
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.4 1.4L6 0L0 6L6 12L7.4 10.6L2.8 6L7.4 1.4Z"
            fill="currentColor"
          />
        </svg>
      </router-link>
    </div>
  </div>
</template>
<script>
import AppBarHeader from '@/components/AppBarHeader.vue';

export default {
  name: 'EmailCampaign',
  components: { AppBarHeader }
};
</script>

<style scoped>
.settingsOptions {
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
}
</style>
