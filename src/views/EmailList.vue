<template>
  <div class="">
    <AppBarHeader :title="'Email List'" :to-link="'/'" :action="{ link: '/', label: 'Add New' }" />
    <div class="flex">
      <ul class="w-full pt-4">
        <li class="flex text-left px-4 py-4">
          <router-link to="/">
            <div>Human Resources</div>
            <div class="item-details text-xs pt-1">
              203 subscribers | 35% opens | 60% clicks
            </div>
          </router-link>
        </li>
        <li class="flex text-left px-4 py-4">
          <router-link to="/">
            <label>Set Default Send Time</label>
            <div class="item-details text-xs pt-1">
              213 subscribers | 35% opens | 60% clicks
            </div>
          </router-link>
        </li>
        <li class="flex text-left px-4 py-4">
          <router-link to="/">
            <label>Marketing</label>
            <div class="item-details text-xs pt-1">
              153 subscribers | 35% opens | 60% clicks
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
    //this.getStats()
  },
  methods: {
    getStats() {
      this.$store.dispatch('distributionGroup/getStats');
    }
  }
};
</script>

<style scoped>
.item-details {
  color: rgba(0, 0, 0, 0.38);
}
</style>
