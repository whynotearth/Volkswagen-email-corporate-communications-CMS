<template>
  <LayoutFixedScrollable>
    <template #content>
      <div>
        <BaseAppBarHeader title="Blue Delta Settings" :to-link="{ name: 'Settings' }" />

        <div class="container px-0 md:px-6">
          <div class="text-left py-6 px-4">
            <p class="mb-6">
              By default, Blue Delta will automatically send each day according to the below details. You can change
              these manually for each individual Blue Delta
              <router-link class="text-secondary underline" :to="{ name: '' }">here</router-link>.
            </p>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import NavigationBottom from '@/components/BaseNavigationBottom';

export default {
  name: 'BlueDeltaSettings',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedScrollable },
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
