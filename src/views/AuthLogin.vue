<template>
  <div class="bg-white flex items-center justify-center min-h-full">
    <div class="w-full">
      <div class="max-w-sm mx-auto px-12">
        <div class="mb-4">
          <img
            class="w-24 h-24 mx-auto block"
            src="https://res.cloudinary.com/whynotearth/image/upload/v1588067012/Volkswagen/cms/Volkswagen_logo_2019_1_ddafyt.svg"
            alt=""
          />
        </div>
        <h1 class="h1-mobile md:h1 mb-20 text-primary mb-h1-mobile">Welcome to Blue Delta</h1>
        <AuthLogin @success="onSuccess" />
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
      return this.$store.getters['authKeep/isAuthenticated'];
    }
  },
  methods: {
    onSuccess() {
      this.$router.push({ name: 'Dashboard' });
    }
  }
};
</script>

<style scoped>
.mb-h1-mobile {
  margin-bottom: 56px;
}
</style>
