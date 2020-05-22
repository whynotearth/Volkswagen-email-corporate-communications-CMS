<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader title="Articles" to-link="/" />
    </template>
    <template #content>
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
    </template>
    <template #footer>
      <BaseNavigationBottom />
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';
import ArticleItem from '@/components/ArticleListsItem.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseNavigationBottom from '@/components/BaseNavigationBottom.vue';
import { mapGetters, mapActions } from 'vuex';
import { formatISODate, formatDate } from '@/helpers.js';
import { isToday, parseISO } from 'date-fns';

export default {
  name: 'Articles',
  components: {
    BaseAppBarHeader,
    BaseTabs,
    BaseTab,
    ArticleItem,
    LayoutFixedScrollable,
    BaseNavigationBottom
  },
  computed: {
    ...mapGetters('email', ['get_daily_plan']),
    todayArticles() {
      const data = this.get_daily_plan.find(article => {
        return isToday(parseISO(article.dateTime));
      });
      return data ? data.articles : [];
    },
    upcomingArticles() {
      let articles = [];
      this.get_daily_plan.forEach(item => {
        if (!isToday(parseISO(item.dateTime))) {
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
    ...mapActions('email', ['fetch_daily_plan'])
  }
};
</script>
