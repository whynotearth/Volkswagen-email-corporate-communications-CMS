<template>
  <div class="h-screen">
    <slot v-bind="{ list, pageInfo }" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MemoList',
  data() {
    return {
      pageInfo: {
        title: 'Memo Stats',
        backRoute: { name: 'StatsOverviewMemos' },
        listItemDetailPath: 'MemoDetailPage'
      }
    };
  },
  computed: {
    ...mapGetters('memo', {
      list: 'get_stats'
    })
  },
  methods: {
    ...mapActions('memo', ['fetch_stats'])
  },
  mounted() {
    this.fetch_stats();
  }
};
</script>
