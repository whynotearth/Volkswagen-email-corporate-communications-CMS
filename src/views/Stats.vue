<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="'Stats'" :to="{ name: 'Dashboard' }" />
    </template>
    <template #content>
      <div class="bg-white flex items-center justify-center min-h-full relative">
        <div class="w-full">
          <!-- <router-link v-if="isAuthenticated" to="/settings" class="absolute top-0 right-0 p-4 text-sm">
            <img
              src="https://res.cloudinary.com/whynotearth/image/upload/v1588066712/Volkswagen/cms/wheel_eqhded.svg"
            />
          </router-link> -->
          <div class="max-w-sm mx-auto px-12">
            <div class="mb-4">
              <img
                class="w-24 h-24 mx-auto block"
                src="https://res.cloudinary.com/whynotearth/image/upload/v1588067012/Volkswagen/cms/Volkswagen_logo_2019_1_ddafyt.svg"
                alt=""
              />
            </div>
            <h1 class="text-primary h1-mobile md:h1 mb-h1-mobile">Let's crunch the numbers...</h1>

            <div v-if="isAuthenticated">
              <router-link
                :to="{ name: 'MemoAdd' }"
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

            <AuthLogin v-if="!isAuthenticated" />
          </div>
        </div>
      </div>
    </template>
    <template #footer v-if="isAuthenticated">
      <NavigationBottom active="stats" />
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import store from '@/store';
import isEmail from 'validator/lib/isEmail';
import AuthLogin from '@/components/AuthLogin';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import NavigationBottom from '@/components/BaseNavigationBottom';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';

export default {
  name: 'StatsPage',
  components: { AuthLogin, BaseAppBarHeader, NavigationBottom, LayoutFixedScrollable },
  computed: {
    isAuthenticated() {
      return this.$store.getters['authKeep/isAuthenticated'];
    }
  },
  methods: {}
};
</script>

<style scoped>
.mb-h1-mobile {
  margin-bottom: 56px;
}
</style>
