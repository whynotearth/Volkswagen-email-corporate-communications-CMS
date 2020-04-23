<template>
  <div>
    <BaseAppBarHeader :title="'Activity Feed'" :to-link="'/'" />

    <div class="px-2 pt-4">
      <ActivityFeedSearchBox />
    </div>

    <div class="p-4">
      <router-link
        class="background text-left mb-8 block"
        :to="{ name: 'ActivityFeedMemoItem', params: { id: 111 } }"
        v-for="(feedItem, index) in [
          { title: 'sssssssssss', date: 'dddddddddd' },
          { title: 's2ssssssssss', date: 'd2ddddddddd' }
        ]"
        :key="index"
      >
        <div class="flex items-center mb-4">
          <h2
            class="tg-body-emphasis-mobile em-high flex-grow whitespace-no-wrap overflow-x-hidden truncate"
            title="All manager with work from lorem ipsum dolor sit amet"
          >
            All manager with work from lorem ipsum dolor sit amet
          </h2>
          <div class="tg-caption-mobile em-disabled pl-2 text-right">03/27/2020</div>
        </div>

        <div class="tg-caption-mobile em-high">To: managers@vw.com</div>
        <div class="tg-caption-mobile em-disabled whitespace-pre-line mb-4">
          Dear colleagues, When transitioning to a remote team, leaders should.
        </div>

        <BaseProgressBar :label="`Open rate: 86%`" :progress="22" />
      </router-link>
    </div>

    <!-- list of memos -->
  </div>
</template>

<script>
import BaseProgressBar from '@/components/BaseProgressBar.vue';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import ActivityFeedSearchBox from '@/components/ActivityFeedSearchBox.vue';

export default {
  name: 'ActivityFeedMemoList',
  components: { BaseProgressBar, BaseAppBarHeader, ActivityFeedSearchBox }
};
</script>
