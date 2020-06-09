<template>
  <div>
    <canvas id="myChart" width="800" height="400"></canvas>
  </div>
</template>

<script>
// // const Chartjs = () => import('chart.js'); TODO: use helpers/addScriptTag
import Chart from 'chart.js';
import { colors } from '@/constants/theme.js';

var MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
var config = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
        data: [1, 500, 100, 200, 300, 800, 900],
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    // title: {
    //   display: true,
    //   text: 'Chart.js Line Chart'
    // },
    // tooltips: {
    //   mode: 'index',
    //   intersect: false
    // },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{ position: 'bottom' }],
      yAxes: [{ position: 'top' }]

      // xAxes: [
      //   {
      //     display: true,
      //     scaleLabel: {
      //       display: true,
      //       labelString: 'Month'
      //     }
      //   }
      // ],
      // yAxes: [
      //   {
      //     display: true,
      //     scaleLabel: {
      //       display: true,
      //       labelString: 'Value'
      //     }
      //   }
      // ]
    }
  }
};

console.log('chart base');

export default {
  name: 'BaseChart',
  mounted() {
    var ctx = document.getElementById('myChart');
    console.log('ctx', ctx);

    var myChart = new Chart(ctx, config);
  }
};
</script>
