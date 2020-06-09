<template>
  <div class="h-screen">
    <slot v-bind="{ list, pageInfo }" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { MemoStatToActivityListItem } from '@/bridges/StatToActivity.js';

export default {
  name: 'MemoList',
  data() {
    return {
      pageInfo: {
        title: 'Memo Stats',
        backRoute: { name: 'StatsOverviewMemos' },
        listItemDetailPath: 'MemoActivityDetail'
      }
    };
  },
  computed: {
    list() {
      const stats = this.$store.getters['memo/get_stats'];
      return stats.map(MemoStatToActivityListItem);
    }
  },
  methods: {
    ...mapActions('memo', ['fetch_stats'])
  },
  mounted() {
    this.fetch_stats();
  }
};
</script>
