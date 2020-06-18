<template>
  <div class="h-screen">
    <slot v-bind="{ activity, pageInfo }" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { MemoStatDetailToActivityDetail } from '@/bridges/StatToActivity.js';

export default {
  name: 'MemoDetail',
  data() {
    return {
      pageInfo: {
        title: 'Open Rate',
        backRoute: { name: 'MemoListActivity' }
      }
    };
  },
  props: ['id'],
  computed: {
    ...mapGetters('memo', ['get_stat']),
    activity() {
      // TODO sometimes udefined stats, provided it is exists, it hase a problem with forEach(), filter(), paseInt() ... too
      let stat = this.get_stat[this.id] || {};
      return MemoStatDetailToActivityDetail(stat);
    }
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
