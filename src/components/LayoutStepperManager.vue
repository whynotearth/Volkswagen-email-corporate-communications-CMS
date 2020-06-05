<template>
  <div class="page h-full flex flex-col">
    <StepperHeader :steps="steps" :step="step" :options="options" />
    <div class="flex-grow z-10 overflow-y-auto narrow-scrollbars">
      <transition name="fadeslow" mode="out-in">
        <slot />
      </transition>
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
  name: 'LayoutStepperManager',
  components: { StepperHeader, StepperFooter },
  props: {
    step: Number,
    steps: Array,
    options: Object
  }
};
</script>
