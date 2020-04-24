<template>
  <div class="text-left block">
    <div class="flex items-center mb-4">
      <h2
        class="tg-body-emphasis-mobile em-high text-inherit flex-grow whitespace-no-wrap overflow-x-hidden truncate transition transition-colors duration-100"
        :title="model.subject"
      >
        {{ model.subject }}
      </h2>
      <div class="tg-caption-mobile text-black em-disabled pl-2 text-right whitespace-no-wrap">
        {{ model.creationDateTime }}
      </div>
    </div>

    <div class="tg-caption-mobile em-high text-black">To: {{ model.to }}</div>
    <div class="tg-caption-mobile em-disabled text-black whitespace-pre-line mb-2">
      {{ model.description }}
    </div>

    <BaseProgressBar :label="`Open rate: ${model.OpenPercentage}%`" :progress="model.OpenPercentage" />
  </div>
</template>

<script>
import BaseProgressBar from '@/components/BaseProgressBar.vue';
import { formatDate } from '@/helpers.js';

export default {
  name: 'MemoListItem',
  props: ['model'],
  components: { BaseProgressBar },
  methods: {
    formatDate
  }
};
</script>
