<template>
  <div class="container mx-auto">
    <div class="max-w-xs mx-auto">
      <div class="flex flex-wrap my-4 ">
        <div class="w-full bg-gray-500 h-12">
          <AuthLogin />
        </div>
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
  mounted() {
    setTimeout(() => {
      if (this.isAuthenticated) {
        this.$router.push({ name: 'Home' });
      }
    }, 2000);
  },
  components: { AuthLogin },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  }
};
</script>
