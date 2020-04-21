<template>
  <div>
    <AppBarHeader :title="'Email Add'" :to-link="'/email/group'" :action="{ label: 'Finish', link: '', method: '' }" />
    <div class="flex flex-wrap items-strech items-center shadow-sm px-4 py-3">
      <label class="w-full text-left mb-2">Add New:</label>
      <div class="mb-4 w-full">
        <BaseInputText
          class="bg-surface"
          v-model="$v.email.$model"
          label="Email"
          placeholder="Email"
          :error="$v.email.$dirty && !$v.email.required"
        >
          <span v-if="$v.email.$dirty && !$v.email.required" class="text-xs text-error">
            Subject is required
          </span>
        </BaseInputText>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import BaseInputText from '@/components/BaseInputText.vue';
import { required, email } from 'vuelidate/lib/validators';
import AppBarHeader from '@/components/AppBarHeader.vue';

export default {
  name: 'EmailAdd',
  components: { BaseInputText, AppBarHeader },
  validations: {
    email: {
      required,
      email
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.getters['distributionGroupName/email'];
      },
      set(value) {
        this.$store.commit('distributionGroupName/updateEmail', value);
      }
    }
  }
};
</script>
