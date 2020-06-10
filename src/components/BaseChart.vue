<template>
  <div>
    <canvas ref="canvas" width="800" height="400"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'BaseChart',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  mounted() {
    var ctx = this.$refs.canvas;
    var myChart = new Chart(ctx, this.config);
  }
};
</script>
