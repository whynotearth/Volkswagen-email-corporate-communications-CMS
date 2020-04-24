<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="'Activity Feed'" :to-link="'/'" />
      <div class="px-2 pt-4 mb-4">
        <ActivityFeedSearchBox />
      </div>
    </template>

    <template #content>
      <div class="px-4 pt-4">
        <div class="mb-8" v-for="(item, index) in 4" :key="index">
          <router-link
            class="cursor-pointer block bg-background"
            :to="{ name: 'ActivityFeedMemoItem', params: { id: 111 } }"
            v-for="(feedItem, index) in [
              {
                subject: 'All manager with work from lorem ipsum dolor sit amet',
                creationDateTime: '0001-01-01T00:00:00',
                to: 'aaaaaaaud',
                description: 'bbbbbbbody by mort',
                OpenPercentage: 85
              }
            ]"
            :key="index"
          >
            <MemoListItem :model="feedItem" />
          </router-link>
        </div>
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import ActivityFeedSearchBox from '@/components/ActivityFeedSearchBox.vue';
import MemoListItem from '@/components/MemoListItem.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';

export default {
  name: 'ActivityFeedMemoList',
  components: { MemoListItem, BaseAppBarHeader, ActivityFeedSearchBox, LayoutFixedScrollable }
};
</script>
