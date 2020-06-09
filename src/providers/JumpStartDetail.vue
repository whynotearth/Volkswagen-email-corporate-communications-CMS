<template>
  <div class="h-screen">
    <slot v-bind="{ activity, pageInfo }" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { JumpStartStatDetailToActivityDetail } from '@/bridges/StatToActivity.js';

export default {
  name: 'JumpStartDetail',
  data() {
    return {
      pageInfo: {
        title: 'Open Rate',
        backRoute: { name: 'JumpStartActivityList' }
      }
    };
  },
  props: ['id'],
  computed: {
    activity() {
      const stat = this.$store.getters['email/get_stat'];
      return JumpStartStatDetailToActivityDetail(stat);
    }
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
