<template>
  <div>
    <div class="bg-background text-left block">
      <div class="flex items-center mb-4">
        <h2
          class="tg-body-emphasis-mobile em-high flex-grow whitespace-no-wrap overflow-x-hidden truncate"
          :title="model.subject"
        >
          {{ model.subject }}
        </h2>
        <div class="tg-caption-mobile em-disabled pl-2 text-right whitespace-no-wrap">{{ model.creationDateTime }}</div>
      </div>

      <div class="tg-caption-mobile em-high">To: {{ model.to }}</div>
      <div class="tg-caption-mobile em-disabled whitespace-pre-line mb-2">
        {{ model.description }}
      </div>

      <BaseProgressBar :label="`Open rate: ${model.OpenPercentage}%`" :progress="model.OpenPercentage" />
    </div>
  </div>
</template>

<script>
import BaseProgressBar from '@/components/BaseProgressBar.vue';

export default {
  name: 'MemoListItem',
  props: ['model'],
  components: { BaseProgressBar }
};
</script>
