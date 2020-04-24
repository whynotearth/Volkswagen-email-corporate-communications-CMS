<template>
  <div>
    <BaseAppBarHeader :title="'Open Rate'" :to-link="'/activity-feed/memos'" />

    <div class="px-2 pt-4 pb-6">
      <ActivityFeedSearchBox />
    </div>

    <div class="px-4 mb-8">
      <MemoListItem
        :model="{
          subject: 'All manager with work from lorem ipsum dolor sit amet',
          creationDateTime: '0001-01-01T00:00:00',
          to: 'aaaaaaaud',
          description: 'bbbbbbbody by mort',
          OpenPercentage: 15
        }"
      />
    </div>

    <!-- tabs: opened/unread -->
    <!-- list of emails -->

    <BaseTabs>
      <BaseTab class="text-left" name="Opened" :selected="true">
        <div class="px-4 pt-6 bg-background">
          <div
            class="mb-4"
            v-for="(readReportLog, index) in [
              {
                to: 'someone@email',
                recieved: '2020/04/10 9:49 PM',
                opened: '2020/04/11 3:30 PM'
              },
              {
                to: 'someone@email',
                recieved: '2020/04/10 9:49 PM',
                opened: '2020/04/11 3:30 PM'
              },
              {
                to: 'someone@email',
                recieved: '2020/04/10 9:49 PM',
                opened: '2020/04/11 3:30 PM'
              },
              {
                to: 'someone@email',
                recieved: '2020/04/10 9:49 PM',
                opened: '2020/04/11 3:30 PM'
              },
              {
                to: 'someone@email',
                recieved: '2020/04/10 9:49 PM',
                opened: '2020/04/11 3:30 PM'
              },
              {
                to: 'someone@email',
                recieved: '2020/04/10 9:49 PM',
                opened: '2020/04/11 3:30 PM'
              }
            ]"
            :key="index"
          >
            <ActivityFeedReadReportLog :model="readReportLog" />
          </div>
        </div>
      </BaseTab>
      <BaseTab class="text-left" name="Unread">
        <span>How much we do it for</span>
      </BaseTab>
    </BaseTabs>
  </div>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';
import ActivityFeedSearchBox from '@/components/ActivityFeedSearchBox.vue';
import MemoListItem from '@/components/MemoListItem.vue';
import ActivityFeedReadReportLog from '@/components/ActivityFeedReadReportLog.vue';

export default {
  name: 'ActivityFeedMemoItem',
  components: {
    BaseAppBarHeader,
    BaseTabs,
    BaseTab,
    ActivityFeedSearchBox,
    MemoListItem,
    ActivityFeedReadReportLog
  }
};
</script>
