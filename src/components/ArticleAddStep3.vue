<template>
  <div class="flex flex-col">
    <div class="container px-4 md:px-6 select-none">
      <BaseDropdown
        class="relative bg-surface text-left border-t"
        placeholder="Schedule time"
        :options="dates"
        v-model="$v.date.$model"
      >
        <template #title="{ selectedOption }">
          Schedule
          <span v-if="dates.length === 0" class="text-gray-500">
            No time slots!
          </span>
          <span v-else-if="selectedOption" class="ml-2 em-medium text-black">
            {{ formatDate(selectedOption) }}
          </span>
        </template>
        <template #option="{ option }">
          <span>
            {{ formatDate(option) }}
          </span>
        </template>
      </BaseDropdown>
    </div>
  </div>
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { mustBeDate } from '@/validations.js';
import { formatDate } from '@/helpers.js';

export default {
  name: 'ArticleAddStep3',
  components: { BaseDropdown },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  validations: {
    date: {
      mustBeDate: value => mustBeDate({ value })
    }
  },
  mounted() {
    this.update_date(this.dates[0]);
  },
  methods: {
    ...mapMutations('article', ['update_date']),
    formatDate
  },
  computed: {
    ...mapGetters('article', [
      'get_date',
      'get_response_message',
      'get_selected_category',
      'get_image',
      'get_headline',
      'get_description'
    ]),
    date: {
      get() {
        return this.get_date;
      },
      set(value) {
        this.update_date(value);
      }
    },
    dates() {
      let d = new Date();
      let dtzOffset = d.getTimezoneOffset() * 60000;
      d.setHours(0, 0, 0, 0);
      d = d.getTime();
      let days = [];
      for (let i = 0; i < 30; i++) {
        let a = d - dtzOffset + i * 86400000;
        days.push(new Date(a));
      }
      return days;
    }
  }
};
</script>

<style scoped>
.preview-box {
  max-width: 572px;
}
.circle-icon {
  top: -16px;
  right: 16px;
}
.category-tag {
  min-width: 130px;
  top: -24px;
  left: 24px;
}
</style>
