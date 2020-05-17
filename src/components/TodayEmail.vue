<template>
  <div class="flex flex-col items-center text-center px-4 my-6">
    <div>
      <h2 class="tg-h2-mobile text-primary">Hi Xavier, here's your Jumpstart email for the day.</h2>
    </div>
    <div class="my-4 w-full">
      <EmailPreview />
    </div>
    <div>
      <h2 class="tg-h2-mobile text-primary">Daily Email will automatically send in</h2>
      <div v-if="get_selected_plan.dateTime" class="counter tg-h2-mobile my-2 text-center">
        <BaseCounter :date="formatDate(get_selected_plan.dateTime, 'MMM d, yyyy h:mm aaa')" />
      </div>
    </div>
    <div>
      <BaseButton @selectButton="selectButton">REVIEW AND SEND</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton';
import BaseCounter from './BaseCounter';
import EmailPreview from '@/components/Email/EmailPreview';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { formatISODate, formatDate } from '@/helpers.js';

export default {
  name: 'TodaysEmail',
  components: { BaseButton, BaseCounter, EmailPreview },
  mounted() {
    this.fetch_daily_plan()
      .then(() => {
        let article, i;
        this.update_selected_plan(this.get_daily_plan[0]);
        for (i = 0; i < 5; i++) {
          article = this.get_selected_plan.articles[i];
          if (article) this.update_selected_articles(article);
          else break;
        }
        this.debounced_preview();
      })
      .catch();
  },
  methods: {
    ...mapActions('email', ['debounced_preview', 'fetch_daily_plan', 'update_selected_articles']),
    ...mapMutations('email', ['update_selected_plan', 'update_preview_link']),
    formatDate,
    selectButton() {
      this.$router.push({ name: 'EditBlueDelta', params: { id: this.get_selected_plan.jumpStartId } });
    }
  },
  computed: {
    ...mapGetters('email', ['get_daily_plan', 'get_selected_plan'])
  }
};
</script>
