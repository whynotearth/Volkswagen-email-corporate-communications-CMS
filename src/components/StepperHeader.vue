<template>
  <div class="header-steppable bg-surface sticky inset-x-0 top-0 z-10 py-1">
    <div class="container px-4 md:px-6">
      <BaseStepperCircle :steps="steps" :current-step="step" :options="options"></BaseStepperCircle>
    </div>
  </div>
</template>

<script>
import BaseStepperCircle from '@/components/BaseStepperCircle.vue';

export default {
  name: 'StepperHeader',
  components: { BaseStepperCircle },
  props: {
    step: Number,
    steps: Array,
    options: Object
  }
};
</script>

<style scoped>
.header-steppable {
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
}
</style>
