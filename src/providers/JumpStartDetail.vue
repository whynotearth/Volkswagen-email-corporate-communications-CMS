<template>
  <div class="h-screen">
    <slot v-bind="{ activity, pageInfo }" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'JumpStartDetail',
  data() {
    return {
      pageInfo: {
        title: 'Open Rate',
        backRoute: { name: 'StatsOverviewJumpstarts' }
      }
    };
  },
  props: ['id'],
  computed: {
    ...mapGetters('email', {
      activity: 'get_stat'
    })
  },
  methods: {
    ...mapActions('email', ['fetch_stat'])
  },
  mounted() {
    this.fetch_stat({
      jumpStartId: this.id
    });
  }
};
</script>
