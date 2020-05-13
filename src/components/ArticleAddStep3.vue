<template>
  <div class="flex flex-col h-full">
    <div class="container md:px-2 px-0 select-none">
      <BaseDropdown
        class="relative bg-surface text-left"
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
    <div class="flex flex-grow bg-brand-gradient overflow-y-auto narrow-scrollbars h-full">
      <div class="container relative px-0 md:px-6 text-left ">
        <div
          class="flex flex-wrap relative bg-white text-black mx-4 my-6 mt-12 p-4 bg-surface border-1"
          :style="{ borderColor: `#${get_selected_category.color}` }"
        >
          <div
            class="h-6 px-3 border-1 category-tag bg-white border-b-0 rounded rounded-bl-none
          rounded-br-none tg-caps-title-print"
            :style="{ borderColor: `#${get_selected_category.color}`, color: `#${get_selected_category.color}` }"
          >
            {{ get_selected_category.name }}
          </div>
          <div class="flex items-center justify-center w-8 h-8 rounded-full bg-white circle-icon">
            <img class="m-auto w-4 h-4" :src="get_selected_category.image" />
          </div>
          <div class="w-full tg-h2-mobile text-black py-3 hidden sm:block">
            {{ get_headline }}
          </div>
          <div class="flex w-full flex-col sm:flex-row">
            <div class="w-full tg-h2-mobile text-black py-3 sm:hidden order-2">
              {{ get_headline }}
            </div>
            <div class="w-full tg-body-mobile text-black em-high whitespace-pre-line break-words flex-grow order-2">
              {{ get_description }}
            </div>
            <div class="order-1 mb-4 sm:mb-0 w-full sm:w-auto sm:order-3 flex-shrink-0">
              <img class="mx-auto article-image" :src="get_image" />
            </div>
          </div>
        </div>
        <p v-if="get_response_message.message" class="font-bold px-4 mb-4" :class="get_response_message.class">
          {{ get_response_message.message }}
        </p>
      </div>
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
.circle-icon {
  position: absolute;
  top: -16px;
  right: 16px;
}

.category-tag {
  min-width: 130px;
  position: absolute;
  top: -24px;
  left: 24px;
}
.article-image {
  width: 92px;
  max-height: 92px;
}
</style>
