<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="'Open Rate'" :to-link="'/activity-feed/memos'" />

      <!-- <div class="container px-0 md:px-6">
        <div class="px-2 pt-4 mb-4">
          <ActivityFeedSearchBox />
        </div>
      </div> -->
    </template>

    <template #content>
      <div class="bg-background z-10 relative">
        <div class="container px-0 md:px-6">
          <div class="px-4 pb-4 pt-2">
            <MemoListItem v-if="get(get_stats, `[${id}].memo`)" :model="get(get_stats, `[${id}].memo`)" />
          </div>
        </div>
      </div>
      <BaseTabs>
        <BaseTab class="text-left" name="Opened" :selected="true">
          <div class="px-4 pt-4 bg-background">
            <div class="mb-4" v-for="(readReportLog, index) in get(get_stats, `${id}.opened`, [])" :key="index">
              <ActivityFeedReadReportLog
                :deliverDateTime="formatDate(readReportLog.deliverDateTime, 'M/d/yyyy h:mm aaa')"
                :openDateTime="formatDate(readReportLog.openDateTime, 'M/d/yyyy h:mm aaa')"
                :email="readReportLog.email"
              />
            </div>
          </div>
        </BaseTab>
        <BaseTab class="text-left" name="Unread">
          <div class="px-4 pt-4 bg-background">
            <div class="mb-4" v-for="(readReportLog, index) in get(get_stats, `${id}.notOpened`, [])" :key="index">
              <ActivityFeedReadReportLog
                :deliverDateTime="formatDate(readReportLog.deliverDateTime, 'M/d/yyyy h:mm aaa')"
                :openDateTime="formatDate(readReportLog.openDateTime, 'M/d/yyyy h:mm aaa')"
                :email="readReportLog.email"
                hideOpened="1"
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
// import ActivityFeedSearchBox from '@/components/ActivityFeedSearchBox.vue';
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
    // ActivityFeedSearchBox,
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
    formatDate
  },
  mounted() {
    this.fetch_stats({
      memoId: this.id
    });
  }
};
</script>
