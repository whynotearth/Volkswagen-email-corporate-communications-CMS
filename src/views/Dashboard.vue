<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader
        :showSettingsLink="true"
        :option="'main-header'"
        :titleEnd="'Hello Sunshine!'"
      ></BaseAppBarHeader>
    </template>
    <template #content>
      <div class="min-h-full relative bg-background">
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
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import store from '@/store';
import NavigationBottom from '@/components/BaseNavigationBottom';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import UserCard from '@/components/UserCard.vue';
import TodayEmail from '@/components/TodayEmail.vue';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
//import SmartSuggestions from '@/components/SmartSuggestions';

export default {
  name: 'Dashboard',
  components: {
    NavigationBottom,
    LayoutFixedScrollable,
    BaseAppBarHeader,
    TodayEmail
  }
};
</script>
