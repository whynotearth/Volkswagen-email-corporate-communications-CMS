<template>
  <div class="">
    <AppBarHeader
      :title="'Email List'"
      :to-link="'/email/campaign'"
      :action="{ link: '/email/campaign', label: 'Add New' }"
    />
    <div class="flex">
      <ul class="w-full pt-4">
        <li
          v-for="stat in stats"
          v-bind:key="stat.distributionGroup"
          class="flex text-left px-4 py-4"
          @click="selectStat(stat)"
        >
          <router-link to="/email/group">
            <div>{{ stat.distributionGroup }}</div>
            <div class="item-details text-xs pt-1">
              {{ stat.subscriberCount }} subscribers | {{ stat.openPercent }}% opens | {{ stat.clickPercent }}% clicks
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import AppBarHeader from '@/components/AppBarHeader.vue';

export default {
  name: 'EmailList',
  components: { AppBarHeader },
  computed: {
    stats() {
      return this.$store.getters['distributionGroup/getStats'];
    }
  },
  mounted() {
    this.getStats();
  },
  methods: {
    getStats() {
      this.$store.dispatch('distributionGroup/getStats');
    },
    selectStat(payload) {
      this.$store.commit('distributionGroup/selectStat', payload);
    }
  }
};
</script>

<style scoped>
.item-details {
  color: rgba(0, 0, 0, 0.38);
}
</style>
