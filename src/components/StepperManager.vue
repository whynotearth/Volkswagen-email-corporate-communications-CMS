<template>
  <div class="page h-screen flex flex-col">
    <StepperHeader :step="step" />
    <div class="scrollable-area flex-grow z-2 overflow-y-auto">
      <div class="container py-4 overflow-y-auto">
        <slot />
      </div>
    </div>
    <StepperFooter></StepperFooter>
  </div>
</template>

<script>
import StepperHeader from '@/components/StepperHeader.vue';
import StepperFooter from '@/components/StepperFooter.vue';

export default {
  name: 'StepperManager',
  components: { StepperHeader, StepperFooter },
  props: {
    step: Number
  }
};
</script>
