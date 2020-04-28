<template>
  <div class="">
    <BaseAppBarHeader title="Distribution Groups" :to-link="'campaign'" />
    <router-link
      :to="{ name: 'EmailListImport' }"
      class="block bg-secondary my-6 mx-12 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile"
    >
      Import New Group
    </router-link>
    <div class="flex">
      <ul class="container px-0 md:px-6">
        <li
          v-for="item in emailList"
          v-bind:key="item.distributionGroup"
          class="flex flex-wrap text-left px-4 py-4 cursor-pointer"
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
