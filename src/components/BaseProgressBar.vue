<template>
  <div class="w-full text-left">
    <label v-if="$slots.label" class="progress-bar--label block mb-1 cursor-inherit" :for="idName"
      ><slot name="label"
    /></label>
    <div :id="idName" :class="holderClassNames" class="w-full bg-grey-light rounded-full overflow-x-hidden">
      <div
        :class="progressClassNames"
        class="text-xs leading-none py-1 text-center text-white rounded-full transition-t difftransform duration-300 w-full"
        :style="{ transform: `translateX(-${100 - progressWidth}%)` }"
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
    idName: {
      type: String,
      default: randomId
    }
  },
  data () {
    return {
      progressWidth: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.progressWidth = this.progress;
    },0)
  }
};
</script>

<style scoped>
.progress-bar--label {
  line-height: 8px;
}
</style>
