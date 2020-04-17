<template>
  <div class="bg-brand-gradient flex items-center justify-center min-h-full">
    <div class="w-full">
      <div class="max-w-sm mx-auto px-6">
        <div class="mb-6">
          <img
            class="w-16 h-16 mx-auto block"
            src="https://res.cloudinary.com/whynotearth/image/upload/v1586859428/Volkswagen/cms/logo-light_um5gka.svg"
            alt=""
          />
        </div>
        <h1 class="h1-mobile md:h1 mb-20 text-white">Welcome to Jumpstart</h1>

        <div v-if="isAuthenticated">
          <router-link
            :to="{ name: 'MemoAdd' }"
            class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile"
          >
            New Memo
          </router-link>
        </div>

        <AuthLogin v-if="!isAuthenticated" />
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import isEmail from 'validator/lib/isEmail';
import AuthLogin from '@/components/AuthLogin';

export default {
  name: 'LoginPage',
  components: { AuthLogin },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  }
};
</script>
