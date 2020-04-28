<template>
  <LayoutFixedScrollable>
    <template #content>
      <div class="flex items-center justify-center min-h-full relative">
        <div class="w-full">
          <router-link v-if="isAuthenticated" to="/settings" class="absolute top-0 right-0 text-white p-4 text-sm">
            <img src="https://res.cloudinary.com/whynotearth/image/upload/v1587275972/Volkswagen/cms/wheel_2_rk5nr4.png" />
          </router-link>
          <div class="max-w-sm mx-auto px-6">
            <div class="mb-6">
              <img
                class="w-16 h-16 mx-auto block"
                src="https://res.cloudinary.com/whynotearth/image/upload/v1586859428/Volkswagen/cms/logo-light_um5gka.svg"
                alt=""
              />
            </div>
            <h1 class="h1-mobile md:h1 mb-20 text-white">Welcome!</h1>

            <div v-if="isAuthenticated">
              <router-link
                :to="{ name: 'MemoAdd' }"
                class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile mb-6"
              >
                Compose New Memo
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
        <NavigationBottom  />
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import store from '@/store';
import isEmail from 'validator/lib/isEmail';
import AuthLogin from '@/components/AuthLogin';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable'
import NavigationBottom from '@/components/BaseNavigationBottom'

export default {
  name: 'LoginPage',
  components: { AuthLogin, NavigationBottom, LayoutFixedScrollable },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  methods: {}
};
</script>
