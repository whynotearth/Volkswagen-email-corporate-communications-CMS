<template>
  <div>
    <div class="mb-4">
      <h2 class="text-primary font-bold text-xl">
        Your Info
      </h2>
    </div>
    <div class="mb-4">
      <BaseInputText class="bg-surface" label="Name" type="text" v-model="name"></BaseInputText>
    </div>
    <div class="mb-4">
      <BaseInputText class="bg-surface" label="Email" type="email" v-model="email"></BaseInputText>
    </div>
    <div class="mb-4 items-center flex justify-center py-8">
      <BaseButton>
        RESET PASSWORD
      </BaseButton>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { mapMutations, mapGetters } from 'vuex';
import BaseInputText from '@/components/BaseInputText.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'BaseUserAccountInfo',
  components: { BaseInputText, BaseButton },
  methods: {
    ...mapMutations('auth', ['update_name', 'update_email'])
  },
  computed: {
    ...mapGetters('auth', ['name', 'email']),
    name: {
      get() {
        return this.name;
      },
      set(value) {
        this.update_name(value);
      }
    },
    email: {
      get() {
        return this.email;
      },
      set(value) {
        this.update_email(value);
      }
    }
  }
};
</script>
