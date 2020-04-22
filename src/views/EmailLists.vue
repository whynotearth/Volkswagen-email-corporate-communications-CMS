<template>
  <div class="">
    <BaseAppBarHeader
      :title="'Email List'"
      :to-link="'campaign'"
      :action="{ link: '/email/campaign', label: 'Add New' }"
    />
    <div class="flex">
      <ul class="w-full pt-4">
        <li
          v-for="item in emailList"
          v-bind:key="item.distributionGroup"
          class="flex flex-wrap text-left px-4 py-4"
          @click="choiceEmailList(item)"
        >
          <div class="w-full">{{ item.distributionGroup }}</div>
          <div class="w-full item-details text-xs pt-1">
            {{ item.subscriberCount }} subscribers | {{ item.openPercent }}% opens | {{ item.clickPercent }}% clicks
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
  name: 'EmailLists',
  components: { BaseAppBarHeader },
  computed: {
    emailList() {
      return this.$store.getters['distributionGroup/getEmailLists'];
    }
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.updateEmailLists([]);
  },
  methods: {
    ...mapActions('distributionGroup', ['getEmailLists']),
    ...mapMutations('distributionGroup', ['selectEmailList', 'updateEmailLists']),
    init() {
      this.getEmailLists();
    },
    choiceEmailList(payload) {
      this.selectEmailList(payload);
      this.$router.push({ name: 'EmailList', params: { groupName: payload.distributionGroup } });
    }
  }
};
</script>

<style scoped>
.item-details {
  color: rgba(0, 0, 0, 0.38);
}
</style>
