<template>
  <LayoutFixedFooter>
    <template #content>
      <div class="bg-white flex items-center justify-center min-h-full relative flex-shrink-0 py-6">
        <div class="w-full">
          <router-link v-if="isAuthenticated" to="/settings" class="absolute top-0 right-0 p-4 text-sm">
            <img
              src="https://res.cloudinary.com/whynotearth/image/upload/v1588066712/Volkswagen/cms/wheel_eqhded.svg"
            />
          </router-link>
          <div class="max-w-sm mx-auto px-12">
            <div class="mb-4">
              <img
                class="w-24 h-24 mx-auto block"
                src="https://res.cloudinary.com/whynotearth/image/upload/v1588067012/Volkswagen/cms/Volkswagen_logo_2019_1_ddafyt.svg"
                alt=""
              />
            </div>
            <h1 class="text-primary h1-mobile md:h1 mb-h1-mobile mb-14">Welcome to Blue Delta</h1>

            <div v-if="isAuthenticated">
              <router-link
                :to="{ name: 'MemoAdd' }"
                class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile mb-6"
              >
                New Memo
              </router-link>
              <router-link
                :to="{ name: 'ActivityFeedMemoList' }"
                class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile"
              >
                View Stats
              </router-link>
            </div>

            <AuthLogin v-if="!isAuthenticated" />
          </div>
        </div>
      </div>
    </template>
    <template #footer v-if="isAuthenticated">
      <NavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<script>
import store from '@/store';
import isEmail from 'validator/lib/isEmail';
import AuthLogin from '@/components/AuthLogin';
import LayoutFixedFooter from '@/components/LayoutFixedFooter';
import NavigationBottom from '@/components/BaseNavigationBottom';

export default {
  name: 'LoginPage',
  components: { AuthLogin, NavigationBottom, LayoutFixedFooter },
  computed: {
    isAuthenticated() {
      return this.$store.getters['authKeep/isAuthenticated'];
    }
  },
  methods: {}
};
</script>
