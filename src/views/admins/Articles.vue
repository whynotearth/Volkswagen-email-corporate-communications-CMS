<template>
  <div class="">
    <BaseAppBarHeader title="Articles" to-link="/" />
    <BaseTabs>
      <BaseTab name="TODAY" selected="true">
        <template v-for="(article, index) in todayArticles">
          <router-link :key="index" :to="{ name: 'AdminArticlesItem', params: { id: article.id } }">
            <ArticleItem :model="article" />
          </router-link>
        </template>
      </BaseTab>
      <BaseTab name="UPCOMING">
        Upcoming articles as soon as possible
      </BaseTab>
    </BaseTabs>
  </div>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';
import ArticleItem from '@/components/admin/ArticleItem.vue';
import { mapGetters, mapActions } from 'vuex';
import { formatISODate } from '@/helpers.js';

export default {
  name: 'Articles',
  components: {
    BaseAppBarHeader,
    BaseTabs,
    BaseTab,
    ArticleItem
  },
  computed: {
    ...mapGetters('article', ['get_daily_plan']),
    todayArticles() {
      const data = this.get_daily_plan.find(article => {
        return article.date === this.getDate();
      });
      return data ? data.articles : [];
    },
    upcomingArticles() {
      const data = this.get_daily_plan.find(article => {
        return article.date !== this.getDate;
      });
      return data ? data.articles : [];
    }
  },
  mounted() {
    this.fetch_daily_plan();
  },
  methods: {
    ...mapActions('article', ['fetch_daily_plan']),
    getDate() {
      let d = new Date();
      d.setHours(0, 0, 0, 0);
      d.toISOString();
      const today = formatISODate(d);
      console.log(today);
      return today;
    }
  }
};
</script>
