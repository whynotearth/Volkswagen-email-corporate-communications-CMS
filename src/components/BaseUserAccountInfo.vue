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
      <BaseButton>
        RESET PASSWORD
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
    ...mapMutations('profile', ['update_name', 'update_email'])
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
