<template>
  <div>
    <canvas ref="canvas" width="800" height="400"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';
import 'chartjs-adapter-date-fns';

export default {
  name: 'BaseChart',
  data: () => ({
    instance: {}
  }),
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  mounted() {
    const ctx = this.$refs.canvas;
    this.instance = new Chart(ctx, this.config);
  },
  watch: {
    config(value) {
      this.instance.data = value.data;
      this.instance.options = value.options;
      this.instance.update();
    }
  }
};
</script>
