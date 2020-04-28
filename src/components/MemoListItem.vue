<template>
  <div class="text-left block shadow-card px-2 py-4 rounded">
    <!-- title and date -->
    <div class="flex items-center mb-4">
      <h2
        class="tg-body-emphasis-mobile em-high text-inherit flex-grow whitespace-no-wrap overflow-x-hidden truncate transition transition-colors duration-100"
        :title="model.subject"
      >
        {{ model.subject }}
      </h2>
      <div class="tg-caption-mobile text-black em-disabled pl-2 text-right whitespace-no-wrap">
        {{ formatDate(model.creationDateTime, 'dd MMM, yyyy') }}
      </div>
    </div>

    <!-- progress -->
    <div class="mb-4">
      <BaseProgressBar :progress="model.openPercentage">
        <template #label>
          <span class="tg-caption-mobile em-high text-black mr-2">Open rate: {{ model.openPercentage }}%</span>
          <span class="tg-caption-mobile em-medium text-black">({{ model.openCount }}/{{ model.sentCount }})</span>
        </template>
      </BaseProgressBar>
    </div>

    <!-- contents -->
    <div class="flex flex-no-wrap">
      <div class="w-20 mr-2 flex-shrink-0">
        <img
          src="https://res.cloudinary.com/whynotearth/image/upload/v1588074840/Volkswagen/cms/Internal_Memo_kbc8ys.png"
          alt=""
        />
      </div>

      <div class="flex-grow flex flex-col overflow-hidden">
        <div class="flex-grow overflow-hidden">
          <div class="tg-caption-mobile em-high text-black">To: {{ model.to }}</div>
          <div class="tg-caption-mobile em-disabled text-black whitespace-pre-line mb-2 pt-2 overflow-hidden">
            {{ model.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap pt-2">
      <div class="mb-1 mr-1">
        <BaseChip :text="model.distributionGroup" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseProgressBar from '@/components/BaseProgressBar.vue';
import BaseChip from '@/components/BaseChip.vue';
import { formatDate } from '@/helpers.js';

export default {
  name: 'MemoListItem',
  props: ['model'],
  components: { BaseProgressBar, BaseChip },
  methods: {
    formatDate
  }
};
</script>
