<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader
        :showSettingsLink="true"
        :option="'main-header'"
        :titleEnd="'Hello Sunshine!'"
      ></BaseAppBarHeader>
    </template>
    <template #content>
      <div class="bg-white flex items-center justify-center min-h-full relative flex-shrink-0 py-6">
        <div class="w-full">
          <div class="max-w-sm mx-auto px-12">
            <div class="mb-4">
              <img
                class="w-30 h-24 mx-auto block"
                src="https://res.cloudinary.com/die9ji2vn/image/upload/v1603095054/vk-new-logo_ik4ew5.png"
                alt=""
              />
            </div>
            <h1 class="text-primary h1-mobile md:h1 mb-h1-mobile mb-14">Welcome</h1>

            <div>
              <router-link
                :to="{ name: 'MemoAdd' }"
                class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile"
              >
                New Memo
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<script>
import store from '@/store';
import NavigationBottom from '@/components/BaseNavigationBottom';
import LayoutFixedFooter from '@/components/LayoutFixedFooter';
import UserCard from '@/components/UserCard.vue';
// import TodayEmail from '@/components/TodayEmail';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
//import SmartSuggestions from '@/components/SmartSuggestions';

export default {
  name: 'Dashboard',
  components: {
    NavigationBottom,
    LayoutFixedFooter,
    BaseAppBarHeader
    // TodayEmail
  }
};
</script>
