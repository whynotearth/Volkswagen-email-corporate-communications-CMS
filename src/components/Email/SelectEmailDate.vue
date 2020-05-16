<template>
  <div class="py-2 flex-grow">
    <div class="container px-4 text-left">
      <div class="flex relative">
        <div class="flex-auto">
          <BaseDropdown
            v-if="get_daily_plan.length"
            placeholder="Select date"
            :options="dates"
            v-model="$v.email_date.$model"
          >
            <template #title="{ selectedOption }">
              <span v-if="selectedOption">
                Schedule
                <span class="ml-2 em-medium">
                  {{ formatDate(selectedOption) }}
                </span>
              </span>
            </template>
            <template #option="{ option }">
              <span>
                {{ formatDate(option) }}
              </span>
            </template>
          </BaseDropdown>
          <p v-if="$v.email_date.$error && get_daily_plan.length" class="text-xs text-error">
            Please select a date.
          </p>
          <p v-if="!get_daily_plan.length && !isLoading">
            <span class="block my-2">
              No articles available!
              <br />
              Click
              <router-link :to="{ name: 'ArticleAdd', params: { step: 1 } }" class="text-secondary underline">
                here
              </router-link>
              to create one
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown';
import { required } from 'vuelidate/lib/validators';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { isSameDay, parseISO } from 'date-fns';
import { formatDate } from '@/helpers.js';

export default {
  name: 'SelectEmailDate',
  components: { BaseDropdown },
  validations: {
    email_date: {
      required
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters('email', ['get_email_date', 'get_daily_plan']),
    ...mapGetters('loading', ['isLoading']),
    email_date: {
      get() {
        return this.get_email_date;
      },
      set(value) {
        this.clear_email_data();
        this.update_email_date(value);
        this.prefillArticles(value);
      }
    },
    dates() {
      if (!this.get_daily_plan.length) return [];
      const dates = [];
      let date;
      this.get_daily_plan.forEach(jumpstart => {
        date = new Date(jumpstart.dateTime).getTime();
        dates.push(date);
      });
      return dates;
    }
  },
  methods: {
    ...mapMutations('email', ['update_email_date', 'update_selected_plan']),
    ...mapActions('email', [
      'clear_email_data',
      'debounced_preview',
      'fetch_daily_plan',
      'update_selected_articles',
      'update_selected_active_articles'
    ]),
    formatDate,
    init() {
      if (this.get_email_date) {
        this.prefillArticles();
      } else {
        this.fetch_daily_plan();
      }
    },
    prefillArticles() {
      let selectedJumpstart;
      const selectedDate = this.get_email_date;
      selectedJumpstart = this.get_daily_plan.find(item => {
        return isSameDay(parseISO(item.dateTime), selectedDate);
      });
      if (selectedJumpstart) {
        this.update_selected_plan(selectedJumpstart);
        this.update_selected_active_articles();
      }
      this.debounced_preview();
    }
  }
};
</script>
