<template>
  <div class="w-100 flex items-center h-20">
    <div class="w-16 h-16">
      <BaseProgressCircle :centerX="32" :centerY="32" :radius="30" :percentageProgress="percentageProgress">
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
      <h3 class="text-primary mb-2 h2-mobile">{{ stepHeader(currentStep) }}</h3>
      <h4 v-if="!options.isLastStep" class="body-1-mobile text-primary">
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
