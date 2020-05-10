<template>
  <div class="">
    <BaseAppBarHeader title="Articles" to-link="/" />
    <BaseTabs>
      <BaseTab name="TODAY" selected="true">
        <template v-for="(article, index) in todayArticles">
          <router-link :key="index" :to="{ name: 'ArticleListsItem', params: { id: article.id } }">
            <ArticleItem :model="article" />
          </router-link>
        </template>
        <div v-if="!todayArticles.length" class="py-8">You don't have an article for today</div>
      </BaseTab>
      <BaseTab name="UPCOMING">
        <template v-for="(article, index) in upcomingArticles">
          <router-link :key="index" :to="{ name: 'ArticleListsItem', params: { id: article.id } }">
            <ArticleItem :model="article" />
          </router-link>
        </template>
        <div v-if="!upcomingArticles.length" class="py-8">You don't have an article for upcoming</div>
      </BaseTab>
    </BaseTabs>
  </div>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';
import ArticleItem from '@/components/ArticleListsItem.vue';
import { mapGetters, mapActions } from 'vuex';
import { formatISODate, formatDate } from '@/helpers.js';

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
        return this.getIsoFormat(article.date) === this.getIsoFormat();
      });
      return data ? data.articles : [];
    },
    upcomingArticles() {
      let articles = [];
      this.get_daily_plan.forEach(item => {
        if (this.getIsoFormat(item.date) !== this.getIsoFormat()) {
          if (item.articles.length) {
            articles = [...articles, ...item.articles];
          }
        }
      });
      return articles;
    }
  },
  mounted() {
    this.fetch_daily_plan();
  },
  methods: {
    ...mapActions('article', ['fetch_daily_plan']),
    getIsoFormat(date) {
      const d = date ? date : new Date();
      const newDate = formatDate(d, 'yyyy-MM-dd');
      return new Date(newDate).toISOString();
    }
  }
};
</script>
