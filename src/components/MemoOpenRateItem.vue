<template>
  <div class="text-left block">
    <div class="flex items-center mb-1">
      <h2
        class="tg-body-emphasis-mobile em-high text-inherit flex-grow whitespace-no-wrap overflow-x-hidden truncate transition transition-colors duration-100"
        :title="model.subject"
      >
        {{ model.subject }}
      </h2>
      <div class="tg-caption-mobile text-black em-disabled pl-2 text-right whitespace-no-wrap">
        {{ filterFormatDate(model.creationDateTime, 'MM/dd/yyyy') }}
      </div>
    </div>

    <div class="tg-caption-mobile em-medium text-black mb-2">To: {{ model.to }}</div>
    <BaseProgressBar :label="`Open rate: ${model.openPercentage}%`" :progress="model.openPercentage" />
  </div>
</template>

<script>
import BaseProgressBar from '@/components/BaseProgressBar.vue';
import { formatDate } from '@/helpers.js';

export default {
  name: 'MemoOpenRateItem',
  props: ['model'],
  components: { BaseProgressBar },
  methods: {
    filterFormatDate(input, format) {
      const date = new Date(input);
      return formatDate(date, format);
    }
  }
};
</script>
