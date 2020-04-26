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
        <MemoOpenRateItem v-if="get(get_stats, `[${id}].memo`)" :model="get(get_stats, `[${id}].memo`)" />
      </div>
      <BaseTabs>
        <BaseTab class="text-left" name="Opened" :selected="true">
          <div class="px-4 pt-4 bg-background">
            <div class="mb-4" v-for="(readReportLog, index) in get(get_stats, `${id}.opened`, [])" :key="index">
              <ActivityFeedReadReportLog
                :deliverDateTime="formatDate(readReportLog.deliverDateTime)"
                :openDateTime="formatDate(readReportLog.openDateTime)"
                :email="readReportLog.email"
              />
            </div>
          </div>
        </BaseTab>
        <BaseTab class="text-left" name="Unread">
          <div class="px-4 pt-4 bg-background">
            <div class="mb-4" v-for="(readReportLog, index) in get(get_stats, `${id}.notOpened`, [])" :key="index">
              <ActivityFeedReadReportLog
                :deliverDateTime="formatDate(readReportLog.deliverDateTime)"
                :openDateTime="formatDate(readReportLog.openDateTime)"
                :email="readReportLog.email"
              />
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
import MemoOpenRateItem from '@/components/MemoOpenRateItem.vue';
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
    MemoOpenRateItem,
    ActivityFeedReadReportLog
  },
  props: ['id'],
  computed: {
    ...mapGetters('memo', ['get_stats'])
  },
  methods: {
    ...mapActions('memo', ['fetch_stats']),
    get,
    formatDate(dateString) {
      return formatDate(dateString, 'yyyy/MM/dd h:mm aaa');
    }
  },
  mounted() {
    this.fetch_stats({
      memoId: this.id
    });
  }
};
</script>
