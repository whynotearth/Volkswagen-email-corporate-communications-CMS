<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader :title="titleHeader" :to-link="{ name: 'Settings' }"></BaseAppBarHeader>
    </template>
    <template #content>
      <div class="container px-0 md:px-6">
        <div class="p-4 max-w-sm mx-auto">
          <BaseButton
            @selectButton="select"
            class="block tg-color-label-mobile bg-secondary w-full hover:bg-blue-700 text-white
            font-bold rounded-full focus:outline-none focus:shadow-outline transition duration-100
            ease-in-out transition-all label-mobile mb-4 shadow-2dp"
          >
            Export Users
          </BaseButton>
          <BaseButton
            @selectButton="goToAddUser"
            class="block tg-color-label-mobile bg-secondary w-full hover:bg-blue-700 text-white
            font-bold rounded-full focus:outline-none focus:shadow-outline transition duration-100
            ease-in-out transition-all label-mobile shadow-2dp"
          >
            Add User
          </BaseButton>
        </div>

        <BaseUserList v-if="getEmails.length" class="mb-6" :list="getEmails" />
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import LayoutFixedFooter from '@/components/LayoutFixedFooter';
import NavigationBottom from '@/components/BaseNavigationBottom';
import BaseButton from '@/components/BaseButton';
import BaseUserList from '@/components/BaseUserListSort';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'UserList',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedFooter, BaseButton, BaseUserList },
  computed: {
    ...mapGetters('distributionGroup', ['selectedEmailList', 'getEmails']),
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
    ...mapMutations('distributionGroup', ['updateEmails']),
    getEmailList() {
      // TODO rename getEmails in store, it's same with getter
      this.$store.dispatch('distributionGroup/getEmails', this.$route.params.groupName);
    },
    goToAddUser() {
      this.$router.push({ name: 'EmailListAdd' });
    },
    select() {
      // TODO link to edit user, that is other branch
    }
  }
};
</script>
