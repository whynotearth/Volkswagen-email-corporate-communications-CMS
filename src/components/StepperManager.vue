<template>
  <div class="page h-screen flex flex-col">
    <StepperHeader :steps="steps" :step="step" :options="options" />
    <div class="flex-grow z-2 overflow-y-hidden">
      <slot />
    </div>
    <StepperFooter
      @changeStep="
        val => {
          $emit('changeStep', val);
        }
      "
      :steps="steps"
      :step="step"
      :options="options"
    ></StepperFooter>
  </div>
</template>

<script>
import StepperHeader from '@/components/StepperHeader.vue';
import StepperFooter from '@/components/StepperFooter.vue';

export default {
  name: 'StepperManager',
  components: { StepperHeader, StepperFooter },
  props: {
    step: Number,
    steps: Array,
    options: Object
  }
};
</script>
