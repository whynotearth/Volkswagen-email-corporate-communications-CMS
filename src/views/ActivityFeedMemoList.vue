<template>
  <div>
    <!-- header -->
    <!-- search input -->

    <div class="p-4">
      <BaseInputText :hasBorder="false" class="bg-surface shadow-card mb-8" v-model="aaaaaaaaaaaaaaa">
        <template #iconBefore>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
              fill="black"
              fill-opacity="0.38"
            />
          </svg>
        </template>
      </BaseInputText>

      <router-link
        class="background text-left mb-8 block"
        to="{name: 'ActivityFeedMemoItem'}"
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
import BaseInputText from '@/components/BaseInputText.vue';
import BaseProgressBar from '@/components/BaseProgressBar.vue';

export default {
  name: 'ActivityFeedMemoList',
  components: { BaseInputText, BaseProgressBar },
  data: () => ({
    aaaaaaaaaaaaaaa: ''
  })
};
</script>
