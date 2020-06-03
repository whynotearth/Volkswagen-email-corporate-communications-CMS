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
          <div class="min-h-full relative bg-background">
            <!-- <router-link to="/settings" class="absolute top-0 right-0 p-4 text-sm z-10">
          <img
            src="https://res.cloudinary.com/whynotearth/image/upload/v1588775654/Volkswagen/cms/wheel_2_prifka.svg"
          />
        </router-link> -->
            <!-- <div class="bg-brand-gradient ">
          <UserCard class="w-full relative container px-0" />
        </div> -->

            <div class="w-full relative container px-0 text-left">
              <TodayEmail />
            </div>
            <!--<div class="mb-8">
          <SmartSuggestions />
        </div>-->
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
import UserCard from '@/components/BaseUserCard';
import TodayEmail from '@/components/TodayEmail';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
//import SmartSuggestions from '@/components/BaseSmartSuggestions';

export default {
  name: 'Dashboard',
  components: {
    NavigationBottom,
    LayoutFixedFooter,
    BaseAppBarHeader,
    TodayEmail
    //SmartSuggestions
  },
  computed: {},
  methods: {}
};
</script>
