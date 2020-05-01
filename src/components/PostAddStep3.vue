<template>
  <div class="py-6 flex-grow">
    <div class="container px-4 md:px-6 text-left">
      <p class="mb-2 tg-body-mobile">Schedule Date</p>
      <BaseInputText
        class="bg-surface mb-4"
        v-model="$v.date.$model"
        label="Date/Time"
        placeholder="20 March, 2020, 7:00 PM"
        :error="$v.date.$dirty && $v.date.$invalid"
      >
        <span v-if="$v.date.$dirty && !$v.date.required" class="text-xs text-error">
          Date/Time is required
        </span>
        <span v-if="$v.date.$dirty && !$v.date.mustBeDate" class="text-xs text-error">
          Date/Time is invalid. Example: 2020-12-24 7:30 pm
        </span>
      </BaseInputText>

      <p v-if="get_response_message.message" class="font-bold px-4 mb-4" :class="get_response_message.class">
        {{ get_response_message.message }}
      </p>
    </div>
  </div>
</template>

<script>
import BaseInputText from '@/components/BaseInputText.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { mustBeDate } from '@/validations.js';

export default {
  name: 'PostAddStep2',
  components: { BaseInputText },
  validations: {
    date: {
      required,
      mustBeDate: value => mustBeDate({ value, isOptional: false })
    }
  },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations('post', ['update_date'])
  },
  computed: {
    ...mapGetters('post', ['get_date', 'get_response_message']),
    date: {
      get() {
        return this.get_date;
      },
      set(value) {
        this.update_date(value);
      }
    }
  }
};
</script>
