<template>
  <BaseChart :config="tagUsageChartConfig" />
</template>

<script>
import { colors, opacity } from '@/constants/theme.js';

export default {
  name: 'ChartTagUsage',
  methods: {
    tagUsageChartConfig() {
      const datasets = [
        {
          label: 'Priority',
          // data: tagUsageData1,
          borderWidth: 2,
          backgroundColor: colors.priority,
          borderColor: colors.priority,
          fill: false
        },
        {
          label: 'One Team',
          // data: tagUsageData2,
          borderWidth: 2,
          backgroundColor: colors.oneteam,
          borderColor: colors.oneteam,
          fill: false
        },
        {
          label: 'People',
          // data: tagUsageData3,
          borderWidth: 2,
          backgroundColor: colors.people,
          borderColor: colors.people,
          fill: false
        },
        {
          label: 'Plant',
          // data: tagUsageData4,
          borderWidth: 2,
          backgroundColor: colors.plant,
          borderColor: colors.plant,
          fill: false
        }
      ];
      const ticks = {
        fontColor: `rgba(0,0,0,${opacity['54']})`,
        fontSize: 12,
        callback: (value, index, values) => {
          let result = 0;
          datasets.forEach(item => {
            result += item.data[index];
          });
          return result;
        }
      };
      return this.getChartConfig({
        datasets,
        ticks,
        showLegend: true
      });
    },
    getChartConfig({ datasets, ticks, showLegend = false, range = this.stats_overview_date_range }) {
      const config = {
        type: 'line',
        data: {
          // labels,
          datasets
        },
        options: {
          elements: {
            point: {
              radius: 0
            }
          },
          legend: {
            display: showLegend,
            align: 'start'
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
                type: 'time',
                position: 'top',
                gridLines: {
                  drawBorder: false,
                  display: false
                },
                ticks
              },
              {
                position: 'bottom',
                ticks: {
                  source: 'data'
                },
                bounds: 'ticks',
                type: 'time',
                time: {
                  unit: 'day',
                  parser: 'yyyy-MM-dd',
                  displayFormats: {
                    day: range.id === '7d_ago' ? 'EEEEEE' : 'MMM d'
                  }
                },
                gridLines: {
                  drawBorder: false,
                  lineWidth: 1,
                  color: colors.divider
                }
              }
            ]
          }
        }
      };
      return config;
    }
  }
};
</script>
