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
      <BaseTabs>
        <BaseTab class="text-left" name="Opened" :selected="true">
          <div class="px-4 pt-4 bg-background">
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
          <div class="px-4 pt-4 bg-background">
            <div
              class="mb-4"
              v-for="(readReportLog, index) in [
                {
                  to: 'someone@email22',
                  recieved: '2020/04/12 9:49 PM',
                  opened: '2020/04/11 3:30 PM'
                },
                {
                  to: 'someone@email3',
                  recieved: '2020/04/10 9:49 PM',
                  opened: '2020/04/11 3:30 PM'
                },
                {
                  to: 'someone@email4',
                  recieved: '2020/04/10 9:49 PM',
                  opened: '2020/04/11 3:30 PM'
                },
                {
                  to: 'someone@email5',
                  recieved: '2020/04/10 9:49 PM',
                  opened: '2020/04/11 3:30 PM'
                },
                {
                  to: 'someone@email6',
                  recieved: '2020/04/10 9:49 PM',
                  opened: '2020/04/11 3:30 PM'
                },
                {
                  to: 'someone@email7',
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
  }
};
</script>
