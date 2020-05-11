<template>
  <div>
    <div class="mb-4">
      <h2 class="text-primary font-bold text-xl">
        Your Info
      </h2>
    </div>
    <div class="mb-4">
      <BaseInputText class="bg-surface" label="Name" type="text" v-model="username"></BaseInputText>
    </div>
    <div class="mb-4">
      <BaseInputText class="bg-surface" label="Email" type="email" v-model="password"></BaseInputText>
    </div>
    <div class="mb-4 items-center flex justify-center py-8">
      <BaseButton>
        RESET PASSWORD
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseInputText from '@/components/BaseInputText.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'BaseUserAccountInfo',
  components: { BaseInputText, BaseButton },
  computed: {
    ...mapGetters('auth', ['email', 'password'])
  },
  data() {
    return {
      username: '',
      password: ''
    };
  }
};
</script>
