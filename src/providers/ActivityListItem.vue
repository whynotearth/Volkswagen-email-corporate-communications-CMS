<template>
  <div class="text-left block shadow-card p-6 rounded">
    <!-- title and date -->
    <div v-if="model.subject">
      <h2
        class="md:tg-body-emphasis-desktop tg-body-emphasis-mobile capitalize em-high text-inherit flex-grow whitespace-no-wrap overflow-x-hidden truncate transition transition-colors duration-100"
        :title="model.subject"
      >
        {{ model.subject }}
      </h2>
    </div>
    <div class="my-4">
      <div class="mr-2 flex flex-wrap" v-for="(tag, index) in model.tags" :key="index">
        <BaseChip :text="tag" />
      </div>
    </div>

    <!-- contents -->
    <div class="flex justify-between">
      <div>
        <div v-if="model.subtitle" class="md:tg-caption-desktop tg-caption-mobile em-high text-black">
          {{ model.subtitle }}
        </div>
        <div class="flex items-center">
          <div class="md:tg-caption-bold-desktop tg-caption-bold-mobile text-black whitespace-no-wrap">
            {{ formatDate(model.date, 'd MMM') }}
          </div>
          <div class="h-2 w-2 mx-2 rounded-full bg-secondary"></div>
          <div class="em-high text-black">
            <span class="md:tg-caption-desktop tg-caption-mobile">Open rate: </span>
            <span class="md:tg-caption-bold-desktop tg-caption-bold-mobile">{{ model.openPercentage }}%</span>
          </div>
        </div>
        <div
          class="memo-list-item--description mt-2 md:tg-caption-desktop tg-caption-mobile em-disabled text-black break-all whitespace-pre-line overflow-hidden"
        >
          {{ model.description }}
        </div>
      </div>
      <div class="w-20 md:w-32 flex-shrink-0">
        <img
          src="https://res.cloudinary.com/whynotearth/image/upload/v1588074840/Volkswagen/cms/Internal_Memo_kbc8ys.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseChip from '@/components/BaseChip.vue';
import { formatDate } from '@/helpers.js';

export default {
  name: 'ActivityListItem',
  props: ['model'],
  components: { BaseChip },
  methods: {
    formatDate
  }
};
</script>

<style scoped>
.memo-list-item--description {
  height: 144px;
  @screen md {
    height: 138px;
  }
}

.activity-list {
  .memo-list-item--description {
    height: 64px;
    @screen md {
      height: 118px;
    }
  }
}
</style>
