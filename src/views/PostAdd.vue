<template>
  <div>
    <StepperManager :step="currentStep" :steps="steps" :options="{ submitText: 'New Post', isLastStep: 1 === 3 }">
      <div class="px-0 overflow-y-auto flex flex-col h-full narrow-scrollbars">
        <PostAddStep1 v-if="currentStep === 1" />
      </div>
    </StepperManager>
  </div>
</template>

<script>
import StepperManager from '@/components/StepperManager.vue';
import PostAddStep1 from '@/components/PostAddStep1.vue';

export default {
  name: 'PostAdd',
  components: { StepperManager, PostAddStep1 },
  props: {
    step: {
      default: 1
    }
  },
  data() {
    return {
      steps: ['Choose Category', 'New Post', 'Schedule Post']
    };
  },
  computed: {
    currentStep() {
      return parseInt(this.step);
    }
  }
};
</script>
