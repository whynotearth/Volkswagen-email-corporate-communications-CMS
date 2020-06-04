<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="'Stats'" :toLink="{ name: 'Dashboard' }" />
    </template>
    <template #content>
      <div class="bg-white flex items-center justify-center min-h-full relative">
        <div class="w-full">
          <div class="max-w-sm mx-auto px-12">
            <div class="mb-4">
              <img
                class="w-24 h-24 mx-auto block"
                src="https://res.cloudinary.com/whynotearth/image/upload/v1588067012/Volkswagen/cms/Volkswagen_logo_2019_1_ddafyt.svg"
                alt=""
              />
            </div>
            <h1 class="text-primary h1-mobile md:h1 mb-h1-mobile">Let's crunch the numbers...</h1>

            <div>
              <router-link
                :to="{ name: 'ActivityFeedJumpStartList' }"
                class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile mb-6"
              >
                BLUE DELTA STATS
              </router-link>
              <router-link
                :to="{ name: 'ActivityFeedMemoList' }"
                class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile"
              >
                MEMO STATS
              </router-link>
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
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import NavigationBottom from '@/components/BaseNavigationBottom';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';

export default {
  name: 'StatsPage',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedScrollable }
};
</script>

<style scoped>
.mb-h1-mobile {
  margin-bottom: 56px;
}
</style>
