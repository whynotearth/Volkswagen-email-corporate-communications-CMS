<template>
  <div>
    <canvas id="myChart" width="800" height="400"></canvas>
  </div>
</template>

<script>
// // const Chartjs = () => import('chart.js'); TODO: use helpers/addScriptTag
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
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, this.config);
  }
};
</script>
