<template>
  <div class="flex flex-col">
    <div class="container px-4 md:px-6 select-none">
      <BaseDropdown
        class="relative bg-surface text-left"
        placeholder="Schedule time"
        :options="dates"
        :icon="'https://res.cloudinary.com/whynotearth/image/upload/v1591633121/Volkswagen/cms/calendar_v7nvia.png'"
        v-model="$v.date.$model"
      >
        <template #icon>
          <Calendar class="inline-block align-baseline mr-4 h-5 w-5 -mb-0.5 pointer-events-none" />
        </template>
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

      <div class="mt-8">
        <p v-if="get_response_message.message" class="font-bold px-4 mb-4" :class="get_response_message.class">
          {{ get_response_message.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown';
import Calendar from '@/assets/calendar.svg';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { mustBeDate } from '@/validations.js';
import { formatDate } from '@/helpers.js';

export default {
  name: 'ArticleAddStep3',
  components: { BaseDropdown, Calendar },
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
