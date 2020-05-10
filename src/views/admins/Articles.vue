<template>
  <div class="">
    <BaseAppBarHeader title="Articles" to-link="/" />
    <BaseTabs>
      <BaseTab name="TODAY" selected="true">
        <template v-for="(article, index) in get_articles">
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
    ...mapGetters('article', ['get_articles'])
  },
  mounted() {
    this.fetch_articles({ params: { date: formatISODate(new Date()) } });
  },
  methods: {
    ...mapActions('article', ['fetch_articles'])
  }
};
</script>
