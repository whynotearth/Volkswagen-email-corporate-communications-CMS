<template>
  <div class="">
    <BaseAppBarHeader
      class="sticky top-0 bg-white"
      :title="titleHeader"
      :to-link="'/settings/email-lists'"
      :action="{ link: `${$route.params.groupName}/add`, label: 'Add New' }"
    />
    <div class="flex">
      <ul class="container px-0 md:px-6 pt-4">
        <li
          v-for="item in getEmails"
          :key="item.id"
          class="flex flex-wrap text-left px-4 py-4 cursor-pointer"
          @click="choiceEmail(item)"
        >
          <div class="w-full">{{ item.email }}</div>
          <div class="w-full item-details text-xs pt-1">
            {{ formatDate(item.creationDateTime, 'M/d/yyyy') }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { formatDate } from '@/helpers.js';

export default {
  name: 'EmailList',
  components: { BaseAppBarHeader },
  computed: {
    ...mapGetters('distributionGroup', ['getEmails', 'selectedEmailList']),
    titleHeader() {
      return (this.selectedEmailList && this.selectedEmailList.distributionGroup) || this.$route.params.groupName || '';
    }
  },
  mounted() {
    this.getEmailList();
  },
  destroyed() {
    this.updateEmails([]);
  },
  methods: {
    ...mapMutations('distributionGroup', ['selectEmail', 'updateEmails']),
    formatDate,
    getEmailList() {
      this.$store.dispatch('distributionGroup/getEmails', this.$route.params.groupName);
    },
    choiceEmail(payload) {
      this.selectEmail(payload);
      this.$router.push({
        name: 'EmailListItem',
        params: {
          groupName: this.$route.params.groupName,
          id: payload.id
        }
      });
    }
  }
};
</script>

<style scoped>
.item-details {
  color: rgba(0, 0, 0, 0.38);
}
</style>
