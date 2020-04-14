<template>
  <div class="w-100 flex">
    <div class="w-20 h-20">
      <BaseProgressCircle :centerX="40" :centerY="40" :radius="25" :percentageProgress="percentageProgress">
        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          class="progress-circle--content text-black text-sm fill-current stroke-0"
        >
          {{ progressText }}
        </text>
      </BaseProgressCircle>
    </div>
    <div class="flex-grow text-right flex items-end flex-col justify-center">
      <h3 class="stepper-title text-primary text-xl mb-2">{{ stepHeader(currentStep) }}</h3>
      <h4 v-if="!options.isLastStep" class="leading-tight text-sm text-primary">
        {{ stepSubheader(currentStep) | formatStepSubHeader }}
      </h4>
    </div>
  </div>
</template>

<script>
import BaseProgressCircle from '@/components/BaseProgressCircle.vue';

export default {
  name: 'CheckoutStepper',
  components: { BaseProgressCircle },
  props: {
    steps: {
      default: []
    },
    currentStep: {
      type: Number,
      required: true
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    stepHeader(currentStep) {
      return this.steps[currentStep - 1] || '';
    },
    stepSubheader(currentStep) {
      return this.stepHeader(currentStep + 1);
    }
  },
  computed: {
    percentageProgress() {
      return this.currentStep / this.stepsCount;
    },
    stepsCount() {
      return this.steps.length;
    },
    progressText() {
      return `${this.currentStep} of ${this.stepsCount}`;
    }
  },
  filters: {
    formatStepSubHeader(subheader) {
      return subheader ? `Next: ${subheader}` : '';
    }
  }
};
</script>

<style scoped>
.stepper-title {
  line-height: 1.181818;
}
</style>
