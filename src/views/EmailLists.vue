<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader title="Distribution Groups" :to-link="{ name: 'Settings' }"></BaseAppBarHeader>
    </template>
    <template #content>
      <div class="container px-0 md:px-6">
        <div class="max-w-xs mx-auto">
          <div class=" mx-12">
            <router-link
              :to="{ name: 'EmailListImport' }"
              class="w-full block bg-secondary my-6 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile"
            >
              Import New Group
            </router-link>
          </div>
        </div>

        <div class="flex">
          <ul>
            <li
              v-for="item in emailList"
              v-bind:key="item.distributionGroup"
              class="flex flex-wrap text-left px-4 py-4 cursor-pointer"
            >
              <router-link
                :to="{ name: 'StatsOverviewDistributionGroup', params: { groupName: item.distributionGroup } }"
              >
                <div class="w-full">{{ item.distributionGroup }}</div>
                <div class="w-full item-details text-xs pt-1">
                  {{ item.subscriberCount }} subscribers | {{ item.openPercent }}% opens | {{ item.clickPercent }}%
                  clicks
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import LayoutFixedFooter from '@/components/LayoutFixedFooter';
import NavigationBottom from '@/components/BaseNavigationBottom';

export default {
  name: 'EmailLists',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedFooter },
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
      this.$router.push({ name: 'UserList', params: { groupName: payload.distributionGroup } });
    }
  }
};
</script>

<style scoped>
.item-details {
  color: rgba(0, 0, 0, 0.38);
}
</style>
