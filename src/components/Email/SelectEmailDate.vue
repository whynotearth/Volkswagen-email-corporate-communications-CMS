<template>
  <div class="py-6 flex-grow">
    <div class="container px-4 text-left">
      <BaseDropdown placeholder="Select date" :options="dates" v-model="$v.email_date.$model">
        <template #title="{ selectedOption }">
          <span v-if="selectedOption">
            {{ formatDate(selectedOption) }}
          </span>
        </template>
        <template #option="{ option }">
          <span>
            {{ formatDate(option) }}
          </span>
        </template>
      </BaseDropdown>
      <p v-if="$v.email_date.$error" class="text-xs text-error">
        Please select a date.
      </p>
    </div>
  </div>
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown';
import { formatDate } from '@/helpers.js';
import { required } from 'vuelidate/lib/validators';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'SelectEmailDate',
  components: { BaseDropdown },
  validations: {
    email_date: {
      required
    }
  },
  computed: {
    ...mapGetters('email', ['get_email_date']),
    email_date: {
      get() {
        return this.get_email_date;
      },
      set(value) {
        this.update_email_date(value);
      }
    },
    dates() {
      let d = new Date();
      d.setHours(0, 0, 0, 0);
      d = d.getTime();
      let days = [];
      for (let i = 0; i < 7; i++) {
        let a = d + i * 86400000;
        days.push(a);
      }
      return days;
    }
  },
  methods: {
    ...mapMutations('email', ['update_email_date']),
    formatDate(payload) {
      return formatDate(payload);
    }
  }
};
</script>

<style></style>
