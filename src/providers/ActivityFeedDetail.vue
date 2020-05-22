<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="pageInfo.title" :to-link="pageInfo.backRoute" />
    </template>

    <template #content>
      <div class="bg-background z-10 relative">
        <div class="container px-0 md:px-6">
          <div class="px-4 pb-4 pt-2">
            <ActivityListItem v-if="get(activity, `[${id}].memoList`)" :model="get(activity, `[${id}].memoList`)" />
          </div>
        </div>
      </div>
      <BaseTabs>
        <BaseTab class="text-left" name="Opened" :selected="true">
          <div class="px-4 pt-4 bg-background">
            <div class="mb-4" v-for="(readReportLog, index) in get(activity, `${id}.opened`, [])" :key="index">
              <ActivityFeedReadReportLog
                :deliverDateTime="formatDate(readReportLog.deliverDateTime, 'dd MMM, yyyy h:mm aaa')"
                :openDateTime="formatDate(readReportLog.openDateTime, 'dd MMM, yyyy h:mm aaa')"
                :email="readReportLog.email"
              />
            </div>
          </div>
        </BaseTab>
        <BaseTab class="text-left" name="Unread">
          <div class="px-4 pt-4 bg-background">
            <div class="mb-4" v-for="(readReportLog, index) in get(activity, `${id}.notOpened`, [])" :key="index">
              <ActivityFeedReadReportLog
                :deliverDateTime="formatDate(readReportLog.deliverDateTime, 'dd MMM, yyyy h:mm aaa')"
                :openDateTime="formatDate(readReportLog.openDateTime, 'dd MMM, yyyy h:mm aaa')"
                :email="readReportLog.email"
                hideOpened="1"
              />
            </div>
          </div>
        </BaseTab>
      </BaseTabs>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';
import ActivityListItem from './ActivityListItem.vue';
import ActivityFeedReadReportLog from '@/components/ActivityFeedReadReportLog.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import NavigationBottom from '@/components/BaseNavigationBottom';
import { get } from 'lodash-es';
import { formatDate } from '@/helpers.js';

export default {
  name: 'ActivityFeedMemoItem',
  components: {
    LayoutFixedScrollable,
    BaseAppBarHeader,
    BaseTabs,
    BaseTab,
    ActivityListItem,
    ActivityFeedReadReportLog,
    NavigationBottom
  },
  props: {
    id: {
      required: true
    },
    pageInfo: {
      type: Object,
      required: true
    },
    activity: {
      required: true
    }
  },
  methods: {
    get,
    formatDate
  }
};
</script>
