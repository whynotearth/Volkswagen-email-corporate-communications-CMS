<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader :title="pageInfo.title" :to-link="pageInfo.backRoute" />
    </template>

    <template #content>
      <div>
        <div class="bg-background z-10 relative">
          <div class="container px-0 md:px-6">
            <div class="px-4 pb-4 pt-2">
              <ActivityListItem v-if="get(activity, `stat`)" :model="get(activity, `stat`)" />
            </div>
          </div>
        </div>
        <BaseTabs>
          <BaseTab class="text-left" name="Opened" :selected="true">
            <div class="px-4 pt-4 bg-background">
              <div class="mb-4" v-for="(readReportLog, index) in get(activity, `opened`, [])" :key="index">
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
              <div class="mb-4" v-for="(readReportLog, index) in get(activity, `notOpened`, [])" :key="index">
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
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';
import ActivityListItem from './ActivityListItem.vue';
import ActivityFeedReadReportLog from '@/components/ActivityFeedReadReportLog.vue';
import LayoutFixedFooter from '@/components/LayoutFixedFooter.vue';
import NavigationBottom from '@/components/BaseNavigationBottom';
import { get } from 'lodash-es';
import { formatDate } from '@/helpers.js';

export default {
  name: 'ActivityDetail',
  components: {
    LayoutFixedFooter,
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
      type: Object,
      required: true
    }
  },
  methods: {
    get,
    formatDate
  }
};
</script>
