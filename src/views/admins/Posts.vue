<template>
  <div class="">
    <BaseAppBarHeader title="Articles" to-link="/" />
    <BaseTabs>
      <BaseTab name="TODAY" selected="true">
        <PostItem v-for="(post, index) in get_posts" :key="index" :model="post" />
      </BaseTab>
      <BaseTab name="UPCOMING">
        Upcoming posts as soon as possible
      </BaseTab>
    </BaseTabs>
  </div>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';
import PostItem from '@/components/admin/PostItem.vue';
import { mapGetters, mapActions } from 'vuex';
import { formatISODate } from '@/helpers.js';

export default {
  name: 'posts',
  components: {
    BaseAppBarHeader,
    BaseTabs,
    BaseTab,
    PostItem
  },
  computed: {
    ...mapGetters('post', ['get_posts'])
  },
  mounted() {
    this.fetch_posts({ params: { date: formatISODate(new Date()) } });
  },
  methods: {
    ...mapActions('post', ['fetch_posts'])
  }
};
</script>
