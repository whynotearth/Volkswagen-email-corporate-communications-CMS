<template>
  <LayoutFixedScrollable>
    <template #content>
      <div class="bg-white flex justify-center min-h-full relative">
        <div class="w-full relative container px-0 text-left">
          <router-link to="/settings" class="absolute top-0 right-0 p-4 text-sm">
            <img
              src="https://res.cloudinary.com/whynotearth/image/upload/v1588066712/Volkswagen/cms/wheel_eqhded.svg"
            />
          </router-link>
          <div class="">
            <div class="">
              <UserCard class="" />
            </div>
            <div class="">
              <TodayEmail />
            </div>
            <div class="mb-8">
              <SmartSuggestions />
            </div>
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
import store from '@/store';
import NavigationBottom from '@/components/BaseNavigationBottom';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import UserCard from '@/components/BaseUserCard';
import TodayEmail from '@/components/TodayEmail';
import SmartSuggestions from '@/components/BaseSmartSuggestions';

export default {
  name: 'Dashboard',
  components: {
    NavigationBottom,
    LayoutFixedScrollable,
    UserCard,
    TodayEmail,
    SmartSuggestions
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.mb-h1-mobile {
  margin-bottom: 56px;
}
</style>
