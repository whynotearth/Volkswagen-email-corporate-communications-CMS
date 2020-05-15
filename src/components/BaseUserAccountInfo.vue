<template>
  <div>
    <div class="mb-4">
      <h2 class="text-primary font-bold text-xl">
        Your Info
      </h2>
    </div>
    <div class="mb-4">
      <BaseInputText class="bg-surface" label="Name" type="text" v-model="userName"></BaseInputText>
    </div>
    <div class="mb-4">
      <BaseInputText class="bg-surface" label="Email" type="email" v-model="userEmail"></BaseInputText>
    </div>
    <div class="py-6 justify-center flex">
      <BaseButton class="w-40" @click="submit()">
        SAVE
      </BaseButton>
    </div>
    <div class="justify-center flex">
      <router-link
        :to="{ name: 'ResetPassword' }"
        class="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 underline"
      >
        Change Password
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

import BaseInputText from '@/components/BaseInputText.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'BaseUserAccountInfo',
  components: { BaseInputText, BaseButton },
  mounted() {
    this.fetch_profile();
  },
  methods: {
    ...mapMutations('profile', ['update_name', 'update_email']),
    ...mapActions('profile', ['fetch_profile']),
    submit() {}
  },
  computed: {
    ...mapGetters('profile', ['get_name', 'get_email']),
    userName: {
      get() {
        return this.get_name;
      },
      set(value) {
        this.update_name(value);
      }
    },
    userEmail: {
      get() {
        return this.get_email;
      },
      set(value) {
        this.update_email(value);
      }
    }
  }
};
</script>
