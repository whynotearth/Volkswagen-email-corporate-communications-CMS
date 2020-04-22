<template>
  <div class="">
    <BaseAppBarHeader
      :title="titleHeader"
      :to-link="'/settings/email-lists'"
      :action="{ link: '/settings/email-list/add', label: 'Add New' }"
    />
    <div class="flex">
      <ul class="w-full pt-4">
        <li
          v-for="item in getEmails"
          :key="item.id"
          class="flex flex-wrap text-left px-4 py-4"
          @click="choiceEmail(item)"
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
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'EmailList',
  components: { BaseAppBarHeader },
  computed: {
    ...mapGetters('distributionGroup', ['getEmails', 'selectedEmailList']),
    titleHeader() {
      return (this.selectedEmailList && this.selectedEmailList.distributionGroup) || '';
    }
  },
  mounted() {
    this.getEmailListGroup();
  },
  methods: {
    ...mapMutations('distributionGroup', ['selectEmail']),
    getEmailListGroup() {
      this.$store.dispatch('distributionGroup/getEmails');
    },
    choiceEmail(payload) {
      this.selectEmail(payload);
      this.$router.push({
        name: 'EmailListItem'
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
