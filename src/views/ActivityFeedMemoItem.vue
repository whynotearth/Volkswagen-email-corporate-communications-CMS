<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="'Open Rate'" :to-link="'/activity-feed/memos'" />

      <div class="px-2 pt-4 mb-4">
        <ActivityFeedSearchBox />
      </div>
    </template>

    <template #content>
      <div class="px-4 pb-4 pt-2 bg-background z-10 relative">
        <MemoListItem v-if="get(get_stats, `[${id}].memo`)" :model="get(get_stats, `[${id}].memo`)" />
      </div>
      <BaseTabs>
        <BaseTab class="text-left" name="Opened" :selected="true">
          <div class="px-4 pt-4 bg-background">
            <div
              class="mb-4"
              v-for="(readReportLog, index) in get(get_stats, `${id}.opened`, []).map(formatDate)"
              :key="index"
            >
              <ActivityFeedReadReportLog :model="readReportLog" />
            </div>
          </div>
        </BaseTab>
        <BaseTab class="text-left" name="Unread">
          <div class="px-4 pt-4 bg-background">
            <div
              class="mb-4"
              v-for="(readReportLog, index) in get(get_stats, `${id}.notOpened`, []).map(formatDate)"
              :key="index"
            >
              <ActivityFeedReadReportLog :model="readReportLog" />
            </div>
          </div>
        </BaseTab>
      </BaseTabs>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';
import ActivityFeedSearchBox from '@/components/ActivityFeedSearchBox.vue';
import MemoListItem from '@/components/MemoListItem.vue';
import ActivityFeedReadReportLog from '@/components/ActivityFeedReadReportLog.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import { mapGetters, mapActions } from 'vuex';
import { get } from 'lodash-es';
import { formatDate } from '@/helpers.js';

export default {
  name: 'ActivityFeedMemoItem',
  components: {
    LayoutFixedScrollable,
    BaseAppBarHeader,
    BaseTabs,
    BaseTab,
    ActivityFeedSearchBox,
    MemoListItem,
    ActivityFeedReadReportLog
  },
  props: ['id'],
  computed: {
    ...mapGetters('memo', ['get_stats'])
  },
  methods: {
    ...mapActions('memo', ['fetch_stats']),
    get,
    formatDate(memo) {
      memo.deliverDateTime = formatDate(memo.deliverDateTime, 'yyyy/MM/dd h:mm aaa');
      memo.openDateTime = formatDate(memo.openDateTime, 'yyyy/MM/dd h:mm aaa');
      return memo;
    }
  },
  mounted() {
    this.fetch_stats({
      memoId: this.id
    });
  }
};
</script>
