<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader title="Settings" :to-link="{ name: 'Dashboard' }"></BaseAppBarHeader>
    </template>
    <template #content>
      <div class="container px-0 md:px-6">
        <div class="flex items-strech items-center border-b-1 border-divider">
          <router-link
            :to="{ name: 'MyAccount' }"
            class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
          >
            <span class="mr-2 tg-body-mobile">My Account</span>
            <ArrowRightIcon />
          </router-link>
        </div>
        <div class="flex items-strech items-center border-b-1 border-divider">
          <router-link
            :to="{ name: 'BlueDeltaSettings' }"
            class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
          >
            <span class="mr-2 tg-body-mobile">JumpStart Settings</span>
            <ArrowRightIcon />
          </router-link>
        </div>
        <div class="flex items-strech items-center border-b-1 border-divider">
          <router-link
            :to="{ name: 'EmailLists' }"
            class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
          >
            <span class="mr-2 tg-body-mobile">Distribution Groups</span>
            <ArrowRightIcon />
          </router-link>
        </div>
        <div class="flex items-strech items-center border-b-1 border-divider">
          <a
            @click.prevent="logout()"
            href="#"
            class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
          >
            <span class="mr-2 tg-body-mobile text-error">Log Out</span>
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<script>
import AuthLogin from '@/components/AuthLogin';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import LayoutFixedFooter from '@/components/LayoutFixedFooter';
import NavigationBottom from '@/components/BaseNavigationBottom';
import ArrowRightIcon from '@/assets/arrow-right.svg';

export default {
  name: 'SettingsPage',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedFooter, ArrowRightIcon },
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
