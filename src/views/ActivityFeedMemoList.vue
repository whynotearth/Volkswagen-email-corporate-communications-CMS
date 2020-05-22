<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="'Memo Stats'" :to-link="{ name: 'Stats' }" />

      <!-- <div class="container px-0 md:px-6 text-left">
        <div class="px-2 pt-4 mb-4">
          <ActivityFeedSearchBox />
        </div>
      </div> -->
    </template>

    <template #content>
      <div class="container px-0 md:px-6 text-left">
        <div class="px-4 pt-4">
          <div class="mb-8" v-for="memoItem in get_stats" :key="memoItem.id">
            <router-link
              class="cursor-pointer block bg-background text-black hover:text-secondary"
              :to="{ name: 'ActivityFeedMemoItem', params: { id: memoItem.id } }"
            >
              <MemoListItem :model="memoItem" />
            </router-link>
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
// import ActivityFeedSearchBox from '@/components/ActivityFeedSearchBox.vue';
import MemoListItem from '@/components/MemoListItem.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import { mapGetters, mapActions } from 'vuex';
import NavigationBottom from '@/components/BaseNavigationBottom';

export default {
  name: 'ActivityFeedMemoList',
  // ActivityFeedSearchBox
  components: { MemoListItem, BaseAppBarHeader, LayoutFixedScrollable, NavigationBottom },
  computed: {
    ...mapGetters('memo', ['get_stats'])
  },
  methods: {
    ...mapActions('memo', ['fetch_stats'])
  },
  mounted() {
    this.fetch_stats();
  }
};
</script>
