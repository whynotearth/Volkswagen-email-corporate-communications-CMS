<template>
  <div class="h-screen">
    <slot v-bind="{ list, pageInfo }" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      pageInfo: {
        title: 'Memo Stats',
        backRoute: { name: 'StatsOverviewMemos' },
        listItemDetailPath: 'ActivityFeedMemoItem'
      }
    };
  },
  computed: {
    ...mapGetters('memo', {
      list: 'get_memos'
    })
  },
  methods: {
    ...mapActions('memo', ['fetch_memos'])
  },
  mounted() {
    this.fetch_memos();
  }
};
</script>
