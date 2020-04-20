<template>
  <div>
    <nav class="flex items-strech items-center px-4 py-3 flex-wrap shadow-md">
      <div class="flex-start mr-3">
        <router-link class="inline-block" to="/">
          <img
            class="mt-1"
            src="https://res.cloudinary.com/whynotearth/image/upload/v1587102533/Volkswagen/cms/back_oay5wt.png"
          />
        </router-link>
      </div>
      <div class="text-primary h2-mobile">
        Settings
      </div>
    </nav>
    <div class="flex items-strech items-center shadow-sm px-4 py-3">
      <a
        v-if="isAuthenticated"
        @click.prevent="logout()"
        href="#"
        class="link-fordward block flex-grow justify-between flex h-full items-center font-semibold cursor-pointer select-none"
      >
        <span class="mr-2 settingsOptions">Log Out</span>

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
      </a>
      <!-- <AuthLogin v-if="!isAuthenticated" /> -->
    </div>
  </div>
</template>
<script>
import PageNavigation from '@/components/PageNavigation.vue';
import AuthLogin from '@/components/AuthLogin';

export default {
  name: 'SettingsPage',
  // components: { AuthLogin },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logout');
        return this.$router.push({ name: 'AuthLogin' });
      } catch (error) {
        // TODO: snackbar
        console.log('logout failed');
      }
    }
  }
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
