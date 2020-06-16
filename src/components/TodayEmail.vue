<template>
  <div class="flex flex-col items-center text-center px-4">
    <div>
      <h2 class="tg-h2-mobile text-primary">
        {{ title }}
      </h2>
    </div>
    <div class="my-4 w-full">
      <EmailPreview />
    </div>
    <div v-if="isTodayArticles">
      <h2 class="tg-h2-mobile text-primary">Daily Email will automatically send in</h2>
      <div v-if="get_selected_plan.dateTime" class="counter tg-h2-mobile my-2 text-center">
        <BaseCounter :date="formatDate(get_selected_plan.dateTime, 'MMM d, yyyy h:mm aaa')" />
      </div>
    </div>
    <div>
      <BaseButton v-if="isTodayArticles" @selectButton="selectReviewArticle">REVIEW AND SEND</BaseButton>
      <BaseButton v-if="!isTodayArticles" @selectButton="selectNewArticle">NEW ARTICLE</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton';
import BaseCounter from './BaseCounter';
import EmailPreview from '@/components/Email/EmailPreview';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { formatISODate, formatDate } from '@/helpers.js';
import { isToday, parseISO } from 'date-fns';

export default {
  name: 'TodaysEmail',
  components: { BaseButton, BaseCounter, EmailPreview },
  beforeMount() {
    this.update_selected_articles();
    this.update_preview_link('');
  },
  mounted() {
    this.fetch_daily_plan()
      .then(() => {
        let article, i;
        if (this.isTodayArticles) {
          this.update_selected_plan(this.get_daily_plan[0]);
          this.update_email_date(this.get_selected_plan.dateTime);
          for (i = 0; i < 5; i++) {
            article = this.get_selected_plan.articles[i];
            if (article) this.update_selected_articles(article);
            else break;
          }
          this.debounced_preview();
        }
      })
      .catch();
  },
  methods: {
    ...mapActions('email', [
      'debounced_preview',
      'fetch_daily_plan',
      'update_selected_articles',
      'update_preview_link'
    ]),
    ...mapMutations('email', ['update_selected_plan', 'update_email_date']),
    formatDate,
    selectReviewArticle() {
      const plan = this.get_selected_plan;
      this.$router.push(
        plan.jumpStartId
          ? { name: 'EditBlueDelta', params: { id: plan.jumpStartId } }
          : { name: 'AddBlueDelta', params: { date: plan.dateTime } }
      );
    },
    selectNewArticle() {
      this.$router.push({ name: 'ArticleCategorySelection' });
    }
  },
  computed: {
    ...mapGetters('email', ['get_daily_plan', 'get_selected_plan']),
    isTodayArticles() {
      const plan = this.get_daily_plan[0];
      return plan && isToday(parseISO(plan.dateTime)) && plan.articles.length;
    },
    title() {
      /* eslint-disable */
      return this.isTodayArticles
        ? // eslint-disable-next-line
          "Hi Xavier, here's your JumpStart email for the day."
        : 'Hi Xavier, there’s no JumpStart scheduled for today';
      /* eslint-enable */
    }
  }
};
</script>
