<template>
  <div>
    <div class="mb-4">
      <h2 class="text-primary font-bold text-xl">
        Your Info
      </h2>
    </div>
    <div class="mb-4">
      <BaseInputText class="bg-surface" label="Name" type="text"></BaseInputText>
    </div>
    <div class="mb-4">
      <BaseInputText class="bg-surface" label="Email" type="email"></BaseInputText>
    </div>
    <div class="mb-4">
      <BaseInputText class="bg-surface" label="Password" type="password"></BaseInputText>
      <router-link to="" class="block py-2 px-4 leading-5 text-secondary cursor-pointer underline">
        Reset Password
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseInputText from '@/components/BaseInputText.vue';

export default {
  name: 'BaseUserAccountInfo',
  components: { BaseInputText },
  computed: {
    email: {
      get() {
        return this.$store.getters['auth/email'];
      }
    },
    password: {
      get() {
        return this.$store.getters['auth/password'];
      }
    }
  }
};
</script>
