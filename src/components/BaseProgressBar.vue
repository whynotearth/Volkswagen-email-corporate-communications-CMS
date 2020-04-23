<template>
  <div class="w-full text-left">
    <label class="tg-caption-mobile block mb-2 cursor-inherit" :for="idName">{{ label }}</label>
    <div :id="idName" :class="holderClassNames" class="w-full bg-grey-light rounded-full overflow-x-hidden">
      <div
        :class="progressClassNames"
        class="text-xs leading-none py-1 text-center text-white rounded-full transition-transform duration-300 w-full"
        :style="{ transform: `translateX(-${100 - progress}%)` }"
      ></div>
    </div>
  </div>
</template>

<script>
import { randomId } from '@/helpers.js';

export default {
  name: 'BaseProgressBar',
  props: {
    progressClassNames: {
      default: 'bg-brand-light-blue-gradient'
    },
    holderClassNames: {
      default: 'bg-divider'
    },
    progress: {
      type: Number,
      default: 0
    },
    label: {
      type: String
    },
    idName: {
      type: String,
      default: randomId
    }
  }
};
</script>
