<template>
  <div class="h-screen">
    <slot v-bind="{ activity, pageInfo }" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MemoDetail',
  data() {
    return {
      pageInfo: {
        title: 'Open Rate',
        backRoute: { name: 'StatsOverviewMemos' }
      }
    };
  },
  props: ['id'],
  computed: {
    ...mapGetters('memo', {
      activity: 'get_stat'
    })
  },
  methods: {
    ...mapActions('memo', ['fetch_stat'])
  },
  mounted() {
    this.fetch_stat({
      memoId: this.id
    });
  }
};
</script>
