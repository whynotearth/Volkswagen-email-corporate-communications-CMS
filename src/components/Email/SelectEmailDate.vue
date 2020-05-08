<template>
  <div class="py-2 flex-grow">
    <div class="container px-4 text-left">
      <div class="flex relative">
        <div class="flex-auto">
          <BaseDropdown
            v-if="get_jumpstarts.length"
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
          <p v-if="$v.email_date.$error && get_jumpstarts.length" class="text-xs text-error">
            Please select a date.
          </p>
          <p v-if="!get_jumpstarts.length && !isLoading">
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
import { formatISODate, formatDate } from '@/helpers.js';

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
    ...mapGetters('email', ['get_email_date', 'get_jumpstarts']),
    ...mapGetters('loading', ['isLoading']),
    email_date: {
      get() {
        return this.get_email_date;
      },
      set(value) {
        console.log(value);
        this.clear_email_data();
        this.update_email_date(value);
        this.prefillArticles(value);
      }
    },
    dates() {
      if (!this.get_jumpstarts.length) return [];
      const dates = [];
      this.get_jumpstarts.forEach(jumpstart => {
        dates.push(jumpstart.dateTime);
      });
      return dates;
    }
  },
  methods: {
    ...mapMutations('email', ['update_email_date', 'update_selected_jumpstart', 'update_articles']),
    ...mapActions('email', ['clear_email_data', 'debounced_preview', 'fetch_jumpstarts', 'update_selected_articles']),
    formatDate,
    formatISODate,
    init() {
      if (this.get_email_date) {
        this.prefillArticles(this.get_email_date);
      } else {
        this.fetch_jumpstarts();
      }
    },
    prefillArticles(date) {
      this.update_selected_articles();
      this.fetch_jumpstarts().then(() => {
        let i, article, selectedJumpstart;
        const selectedDate = this.get_email_date;
        selectedJumpstart = this.get_jumpstarts.find(item => {
          return item.dateTime == selectedDate;
        });
        this.update_selected_jumpstart(selectedJumpstart);
        this.update_articles(selectedJumpstart.articles);
        for (i = 0; i < 5; i++) {
          article = selectedJumpstart.articles[i];
          if (article) this.update_selected_articles(article);
          else break;
        }
        this.debounced_preview();
      });
    }
  }
};
</script>
