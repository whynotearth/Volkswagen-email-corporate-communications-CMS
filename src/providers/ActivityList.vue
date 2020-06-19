<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader :title="pageInfo.title" :to-link="pageInfo.backRoute" />
    </template>

    <template #content>
      <div class="activity-list container px-0 md:px-6 text-left">
        <div class="px-4 pt-4">
          <div class="mb-8" v-for="item in list" :key="item.id">
            <router-link
              class="cursor-pointer block bg-background text-black hover:text-secondary"
              :to="{ name: pageInfo.listItemDetailPath, params: { id: item.id } }"
            >
              <ActivityListItem :model="item" />
            </router-link>
          </div>
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
import ActivityListItem from './ActivityListItem.vue';
import LayoutFixedFooter from '@/components/LayoutFixedFooter.vue';
import { mapGetters, mapActions } from 'vuex';
import NavigationBottom from '@/components/BaseNavigationBottom';

export default {
  name: 'ActivityFeedConsumer',
  props: {
    pageInfo: {
      type: Object,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  components: { ActivityListItem, BaseAppBarHeader, LayoutFixedFooter, NavigationBottom }
};
</script>
