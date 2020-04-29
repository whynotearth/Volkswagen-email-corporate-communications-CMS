<template>
  <LayoutFixedScrollable>
    <template #content>
      <div class="bg-white flex justify-center min-h-full relative">
        <div class="w-full">
          <router-link to="/settings" class="absolute top-0 right-0 p-4 text-sm">
            <img
              src="https://res.cloudinary.com/whynotearth/image/upload/v1588066712/Volkswagen/cms/wheel_eqhded.svg"
            />
          </router-link>
          <div class="max-w-sm mx-auto px-12">
            <div class="mb-4">
              <UserCard />
            </div>
            <div class="mb-4">
              <TodaysEmail />
            </div>
            <div class="mb-4">
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
import TodaysEmail from '@/components/BaseTodaysEmail';
import SmartSuggestions from '@/components/BaseSmartSuggestions';

export default {
  name: 'Dashboard',
  components: {
    NavigationBottom,
    LayoutFixedScrollable,
    UserCard,
    TodaysEmail,
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
