<template>
  <div>
    <BaseAppBarHeader :title="'Settings'" :to-link="'/'" />
    <div class="flex items-strech items-center border-b-1 border-divider">
      <router-link
        v-if="isAuthenticated"
        to="settings/campaign"
        class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
      >
        <span class="mr-2 tg-body-mobile">Email Settings</span>
        <svg
          class="transform -scale-x-1 text-gray"
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
    <div class="flex items-strech items-center border-b-1 border-divider">
      <router-link
        v-if="isAuthenticated"
        to="/"
        class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
      >
        <span class="mr-2 tg-body-mobile">Memo Activity</span>
        <svg
          class="transform -scale-x-1 text-gray"
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
    <div class="flex items-strech items-center border-b-1 border-divider">
      <router-link
        v-if="isAuthenticated"
        :to="{ name: 'EmailListImport' }"
        class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
      >
        <span class="mr-2 tg-body-mobile">Import Email List</span>
        <svg
          class="transform -scale-x-1 text-gray"
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
    <div class="flex items-strech items-center border-b-1 border-divider">
      <a
        v-if="isAuthenticated"
        @click.prevent="logout()"
        href="#"
        class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
      >
        <span class="mr-2 tg-body-mobile">Log Out</span>

        <svg
          class="transform -scale-x-1 text-gray"
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
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';

export default {
  name: 'SettingsPage',
  components: { BaseAppBarHeader },
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
.text-gray {
  color: rgba(0, 0, 0, 0.54);
}
</style>
