<template>
  <div class="h-screen">
    <img
      v-if="shouldShowLogo"
      class="logo"
      contain
      :height="64"
      src="https://res.cloudinary.com/whynotearth/image/upload/v1586844643/Volkswagen/cms/logo_tjf9ej.svg"
    ></img>
    <img
      class="d-none"
      @load="shouldShowLogo = true"
      src="https://res.cloudinary.com/whynotearth/image/upload/v1586844643/Volkswagen/cms/logo_tjf9ej.svg"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import { zindexSplashScreen } from '@/styles/variables.scss';
const waitingUntilShowingLoading = 3000;
const visibilityTimeout = 6000;

export default Vue.extend({
  name: 'page-splash-screen',
  data: () => ({
    shouldShowLogo: false,
    zindexSplashScreen,
    visibilityTimedOut: false,
    shouldShowLoading: false
  }),
  mounted() {
    this.timers();
  }
});
</script>

<style scoped>
.logo {
  margin-top: rem(56px);
}
</style>
