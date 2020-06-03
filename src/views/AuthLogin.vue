<template>
  <LayoutFixedScrollable>
    <template #content>
      <div class="flex items-center justify-center min-h-full flex-shrink-0">
        <div class="text-left py-4">
          <div class="w-full">
            <div class="max-w-sm mx-auto px-4 md:px-6">
              <div class="mb-4">
                <img
                  class="w-24 h-24 mx-auto block"
                  src="https://res.cloudinary.com/whynotearth/image/upload/v1588067012/Volkswagen/cms/Volkswagen_logo_2019_1_ddafyt.svg"
                  alt=""
                />
              </div>
              <h1 class="h1-mobile md:h1 mb-20 text-primary mb-h1-mobile mb-14 text-center">Welcome to Blue Delta</h1>
              <AuthLogin @success="onSuccess" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import store from '@/store';
import isEmail from 'validator/lib/isEmail';
import AuthLogin from '@/components/AuthLogin';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';

export default {
  name: 'LoginPage',
  components: { AuthLogin, LayoutFixedScrollable },
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
