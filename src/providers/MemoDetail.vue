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
    activity() {
      const stat = this.$store.getters['memo/get_stat'][this.id];
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
