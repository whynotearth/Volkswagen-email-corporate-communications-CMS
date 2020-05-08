<template>
  <LayoutFixedScrollable>
    <template #content>
      <div>
        <BaseAppBarHeader title="Settings" :to-link="'/'" />
        <div class="container px-0 md:px-6">
          <div class="flex items-strech items-center border-b-1 border-divider">
            <router-link
              :to="{ name: '' }"
              class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
            >
              <span class="mr-2 tg-body-mobile">My Account</span>
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
              :to="{ name: 'BlueDeltaSettings' }"
              class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
            >
              <span class="mr-2 tg-body-mobile">Blue Delta Settings</span>
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
              :to="{ name: 'EmailLists' }"
              class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
            >
              <span class="mr-2 tg-body-mobile">Distribution Groups</span>
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
              @click.prevent="logout()"
              href="#"
              class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
            >
              <span class="mr-2 tg-body-mobile text-error">Log Out</span>

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
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedScrollable>
</template>
<script>
import PageNavigation from '@/components/PageNavigation.vue';
import AuthLogin from '@/components/AuthLogin';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import NavigationBottom from '@/components/BaseNavigationBottom';

export default {
  name: 'SettingsPage',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedScrollable },
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
