<template>
  <div class="h-screen">
    <slot v-bind="{ activity, pageInfo }" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
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
      activity: 'get_stats'
    })
  },
  methods: {
    ...mapActions('memo', ['fetch_stats'])
  },
  mounted() {
    this.fetch_stats({
      memoId: this.id
    });
  }
};
</script>
