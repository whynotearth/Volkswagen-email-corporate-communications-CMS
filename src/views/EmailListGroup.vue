<template>
  <div class="">
    <AppBarHeader :title="titleHeader" :to-link="'/email/list'" :action="{ link: '/email/add', label: 'Add New' }" />
    <div class="flex">
      <ul class="w-full pt-4">
        <li
          v-for="item in recipients"
          :key="item.id"
          class="flex flex-wrap text-left px-4 py-4"
          @click="selectEmail(item)"
        >
          <div class="w-full">{{ item.email }}</div>
          <div class="w-full item-details text-xs pt-1">
            {{ item.creationDateTime }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import AppBarHeader from '@/components/AppBarHeader.vue';

export default {
  name: 'EmailListGroup',
  components: { AppBarHeader },
  computed: {
    recipients() {
      return this.$store.getters['distributionGroup/getRecipients'];
    },
    selectedStat() {
      return this.$store.getters['distributionGroup/selectedStat'];
    },
    titleHeader() {
      return (this.selectedStat && this.selectedStat.distributionGroup) || '';
    }
  },
  mounted() {
    this.getEmailListGroup();
  },
  methods: {
    getEmailListGroup() {
      this.$store.dispatch('distributionGroup/getRecipients');
    },
    selectEmail(payload) {
      this.$store.commit('distributionGroup/selectEmail', payload);
      this.$router.push({ name: 'EmailSelect' });
    }
  }
};
</script>

<style scoped>
.item-details {
  color: rgba(0, 0, 0, 0.38);
}
</style>
