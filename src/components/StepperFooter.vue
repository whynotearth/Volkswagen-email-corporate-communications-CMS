<template>
  <footer class="page-footer h-12 relative">
    <div class="absolute h-full w-full flex z-1">
      <div class="bg-surface flex-grow"></div>
      <div class="bg-primary flex-grow"></div>
    </div>
    <div class="container flex items-center h-full z-2 relative px-6">
      <a
        @click="$emit('changeStep', -1)"
        class="link-back block bg-surface flex h-full items-center justify-start font-normal text-error cursor-pointer select-none"
      >
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.4 1.4L6 0L0 6L6 12L7.4 10.6L2.8 6L7.4 1.4Z"
            fill="currentColor"
          />
        </svg>

        <span class="ml-2">Back</span>
      </a>
      <a
        @click="$emit('changeStep', 1)"
        class="link-forward block bg-primary flex-grow text-white flex h-full items-center justify-end font-semibold cursor-pointer select-none"
      >
        <span class="mr-2">{{ stepHeaderNext(step) }}</span>

        <svg
          class="transform -scale-x-1"
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.4 1.4L6 0L0 6L6 12L7.4 10.6L2.8 6L7.4 1.4Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.link-back {
  width: 28.88889%;
}
.page-footer {
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
}
.flip {
  transform: scaleX(-1);
}
</style>

<script>
export default {
  name: 'StepperFooter',
  props: {
    step: Number,
    steps: Array,
    options: Object
  },
  methods: {
    stepHeaderNext(currentStep) {
      if (this.options.isLastStep) {
        return this.options.submitText;
      }
      return this.steps[currentStep] || '';
    }
  }
};
</script>
