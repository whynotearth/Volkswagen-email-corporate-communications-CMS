<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="'Activity Feed'" :to-link="'/settings'" />
      <div class="px-2 pt-4 mb-4">
        <ActivityFeedSearchBox />
      </div>
    </template>

    <template #content>
      <div class="px-4 pt-4">
        <div class="mb-8" v-for="memoItem in get_memos" :key="memoItem.id">
          <router-link
            class="cursor-pointer block bg-background text-black hover:text-secondary"
            :to="{ name: 'ActivityFeedMemoItem', params: { id: memoItem.id } }"
          >
            <MemoListItem :model="memoItem" />
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ActivityFeedMemoList',
  components: { MemoListItem, BaseAppBarHeader, ActivityFeedSearchBox, LayoutFixedScrollable },
  computed: {
    ...mapGetters('memo', ['get_memos'])
  },
  methods: {
    ...mapActions('memo', ['fetch_memos'])
  },
  mounted() {
    this.fetch_memos();
  }
};
</script>
