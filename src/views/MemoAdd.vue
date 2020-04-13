<template>
  <StepperManager :step="parseInt(step)">
    start
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    end
  </StepperManager>
</template>

<script>
import StepperManager from '@/components/StepperManager.vue';

export default {
  name: 'MemoAdd',
  components: { StepperManager },
  props: {
    step: {
      default: 1
    }
  },
  methods: {
    parseInt
  }
};
</script>
