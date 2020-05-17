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
    <div class="mb-4 items-center flex justify-center py-8">
      <BaseButton @selectButton="selectButton">
        Change Password
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import BaseInputText from '@/components/BaseInputText.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'BaseUserAccountInfo',
  components: { BaseInputText, BaseButton },
  methods: {
    ...mapMutations('auth', ['updateName', 'updateEmail']),
    selectButton() {
      this.$router.push({ name: 'ChangePassword' });
    }
  },
  computed: {
    ...mapGetters('auth', ['name', 'email']),
    userName: {
      get() {
        return this.name;
      },
      set(value) {
        this.updateName(value);
      }
    },
    userEmail: {
      get() {
        return this.email;
      },
      set(value) {
        this.updateEmail(value);
      }
    }
  }
};
</script>
