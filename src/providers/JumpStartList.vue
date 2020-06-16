<template>
  <div class="h-screen">
    <slot v-bind="{ list, pageInfo }" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { JumpStartStatToActivityListItem } from '@/bridges/StatToActivity.js';

export default {
  name: 'JumpStartList',
  data() {
    return {
      pageInfo: {
        title: 'JumpStart Stats',
        backRoute: { name: 'StatsOverviewJumpstarts' },
        listItemDetailPath: 'JumpStartActivityDetail'
      }
    };
  },
  computed: {
    list() {
      const stats = this.$store.getters['email/get_stats'];
      return stats.map(JumpStartStatToActivityListItem);
    }
  },
  methods: {
    ...mapActions('email', ['fetch_stats'])
  },
  mounted() {
    this.fetch_stats();
  }
};
</script>
