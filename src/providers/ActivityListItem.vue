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

    <!-- contents -->
    <div class="flex flex-no-wrap mb-4">
      <div class="w-20 mr-2 flex-shrink-0">
        <img
          src="https://res.cloudinary.com/whynotearth/image/upload/v1588074840/Volkswagen/cms/Internal_Memo_kbc8ys.png"
          alt=""
        />
      </div>

      <div class="flex-grow flex flex-col overflow-hidden">
        <div class="flex-grow overflow-hidden">
          <div class="tg-caption-mobile em-high text-black">To: {{ model.to }}</div>
          <div
            class="memo-list-item--description tg-caption-mobile em-disabled text-black whitespace-pre-line mb-2 pt-2 overflow-hidden"
          >
            {{ model.description }}
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="mb-1 mr-1" v-for="(distributionGroup, index) in model.distributionGroups" :key="index">
            <BaseChip :text="distributionGroup" />
          </div>
        </div>
      </div>
    </div>

    <BaseProgressBar :progress="model.openPercentage">
      <template #label>
        <span class="tg-caption-mobile em-high text-black mr-2">Open rate: {{ model.openPercentage }}%</span>
        <span class="tg-caption-mobile em-medium text-black">({{ model.openCount }}/{{ model.sentCount }})</span>
      </template>
    </BaseProgressBar>
  </div>
</template>

<script>
import BaseProgressBar from '@/components/BaseProgressBar.vue';
import BaseChip from '@/components/BaseChip.vue';
import { formatDate } from '@/helpers.js';

export default {
  name: 'ActivityListItem',
  props: ['model'],
  components: { BaseProgressBar, BaseChip },
  methods: {
    formatDate
  }
};
</script>

<style scoped>
.memo-list-item--description {
  height: 56px;
}
</style>
