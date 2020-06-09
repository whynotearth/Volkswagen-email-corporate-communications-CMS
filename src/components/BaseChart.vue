<template>
  <div>
    <canvas id="myChart" width="800" height="400"></canvas>
  </div>
</template>

<script>
// // const Chartjs = () => import('chart.js'); TODO: use helpers/addScriptTag
import Chart from 'chart.js';
import { colors } from '@/constants/theme.js';

const data = [100, 500, 100, 200, 300, 800, 900];
var config = {
  type: 'line',
  data: {
    labels: ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'],
    datasets: [
      {
        borderWidth: 2,
        label: 'My First dataset',
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
        data,
        fill: false
      }
    ]
  },
  options: {
    elements: {
      point: {
        radius: 0
      }
    },
    legend: {
      display: false
    },
    tooltips: false,
    responsive: true,
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      yAxes: [
        {
          ticks: { min: 0, display: false },
          gridLines: {
            drawBorder: false,
            display: false
          }
        }
      ],
      xAxes: [
        {
          position: 'bottom',
          gridLines: {
            drawBorder: false,
            lineWidth: 1,
            color: colors.divider
          }
        },
        {
          position: 'top',
          gridLines: {
            drawBorder: false,
            display: false
          },
          ticks: {
            callback: function(value, index, values) {
              return data[index];
            }
          }
        }
      ]
    }
  }
};

export default {
  name: 'BaseChart',
  mounted() {
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, config);
  }
};
</script>
