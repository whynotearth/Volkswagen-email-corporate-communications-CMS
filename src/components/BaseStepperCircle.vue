<template>
  <div class="w-100 flex">
    <div>
      <svg class="w-20 h-20 text-inactive stroke-current">
        <circle class="text-gray-300" :cx="centerX" :cy="centerY" :r="radius" fill="transparent" />
        <circle
          :class="progressClasses"
          class="text-button stroke-current progress-bar"
          :cx="centerX"
          :cy="centerY"
          :r="radius"
          fill="transparent"
          :stroke-dasharray="strokeDashArray"
        />
        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          class="text-black text-sm fill-current stroke-0"
        >
          {{ progressText }}
        </text>
      </svg>
    </div>
    <div class="flex-grow text-right flex items-end flex-col justify-center">
      <h3 class="stepper-title text-primary text-xl mb-2">{{ stepHeader(currentStep) }}</h3>
      <h4 class="leading-tight text-sm text-primary">
        {{ stepSubheader(currentStep) | formatStepSubHeader }}
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutStepper',
  props: {
    steps: {
      default: []
    },
    progressClasses: {
      default: 'text-secondary'
    },
    currentStep: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    radius: 25,
    centerX: 40,
    centerY: 40
  }),
  methods: {
    stepHeader(currentStep) {
      return this.steps[currentStep - 1] || '';
    },
    stepSubheader(currentStep) {
      return this.stepHeader(currentStep + 1);
    }
  },
  computed: {
    stepsCount() {
      return this.steps.length;
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    percentageProgress() {
      const progressPercentage = this.currentStep / this.stepsCount;
      return this.circumference * progressPercentage;
    },
    strokeDashArray() {
      return `${this.percentageProgress} ${this.circumference}`;
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
svg {
  transform: rotate(-90deg);
  stroke-width: 0.25rem;
}

svg text {
  transform: rotate(90deg) translate(0, -5rem);
}
.stepper-title {
  line-height: 1.181818;
}
</style>
