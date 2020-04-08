<template>
  <div>
    <PageNavigation />

    <div class="container mx-auto mt-4">
      <div class="max-w-xs mx-auto">
        <div class="flex flex-wrap my-4 ">
          <div class="w-full bg-gray-500 h-12">
            <AuthLogin />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import isEmail from 'validator/lib/isEmail';
import AuthLogin from '@/components/AuthLogin';
import PageNavigation from '@/components/PageNavigation.vue';

export default {
  name: 'LoginPage',
  components: { AuthLogin, PageNavigation },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  }
};
</script>
