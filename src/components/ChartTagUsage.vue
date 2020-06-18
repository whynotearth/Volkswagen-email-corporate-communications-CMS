<template>
  <BaseChart :config="chartConfig" />
</template>

<script>
import { colors, opacity } from '@/constants/theme.js';
import BaseChart from '@/components/BaseChart';
import { cloneDeep, sortBy, random } from 'lodash-es';
import { stringToHashCode } from '@/helpers.js';
const MAX_TAGS_TO_SHOW = 4;

const materialColors = [
  '#d32f2f',
  '#C2185B',
  '#7B1FA2',
  '#512DA8',
  '#303F9F',
  '#1976D2',
  '#0097A7',
  '#00796B',
  '#388E3C',
  '#AFB42B',
  '#FBC02D',
  '#F57C00',
  '#5D4037',
  '#651FFF',
  '#4CAF50',
  '#00E676',
  '#E91E63',
  '#3D5AFE',
  '#283593'
];

// eslint-disable-next-line
const PARSER_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

export default {
  name: 'ChartTagUsage',
  components: { BaseChart },
  props: {
    stats_overview: {
      type: Object
    },
    stats_overview_date_range: {
      type: Object
    }
  },
  computed: {
    tags() {
      const tags = cloneDeep(this.stats_overview.tags);
      tags.map(item => {
        item.totalCount = item.stats.reduce((acc, current) => {
          return acc + parseInt(current.count);
        }, 0);
        return item;
      });

      const slicedSortedTags = sortBy(tags, 'totalCount')
        .reverse()
        .slice(0, MAX_TAGS_TO_SHOW);

      slicedSortedTags.map(item => {
        item.color = colors[item.tag.toLowerCase()] || this.getRandomColor(item.tag);
      });
      return slicedSortedTags;
    },
    stats() {
      let result = [];
      this.tags.forEach(item => {
        result = [...result, ...item.stats];
      });
      return result;
    },
    chartConfig() {
      const datasets = this.tags.map(tagData => {
        const data = this.adaptDataset(tagData.stats);
        const tagName = tagData.tag;
        return {
          label: tagName,
          data,
          borderWidth: 2,
          backgroundColor: tagData.color,
          borderColor: tagData.color,
          fill: false
        };
      });
      const ticks = {
        source: 'data',
        fontColor: `rgba(0,0,0,${opacity['54']})`,
        fontSize: 12,
        callback: (value, index, values) => {
          const result = this.stats
            .filter(item => item.date === value)
            .map(item => item.count)
            .reduce((acc, current) => acc + current, 0);

          return result;
        }
      };
      return this.getChartConfig({ datasets, ticks });
    }
  },
  methods: {
    getRandomColor(tagName) {
      const index = stringToHashCode(tagName) % (materialColors.length - 1);
      console.log('index', index);

      return materialColors[index];
    },
    adaptDataset(inputData) {
      return inputData.map(item => ({ t: item.date, y: item.count }));
    },
    getChartConfig({ datasets, ticks, range = this.stats_overview_date_range }) {
      const config = {
        type: 'line',
        data: {
          datasets
        },
        options: {
          elements: {
            point: {
              radius: 0
            }
          },
          // https://www.chartjs.org/docs/latest/configuration/legend.html
          legend: {
            display: true,
            align: 'start',
            labels: {
              boxWidth: 16,
              fontSize: 12
            }
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
                // https://www.chartjs.org/docs/latest/axes/cartesian/time.html
                type: 'time',
                position: 'top',
                gridLines: {
                  drawBorder: false,
                  display: false
                },
                time: {
                  unit: 'day',
                  parser: PARSER_FORMAT,
                  displayFormats: {
                    day: PARSER_FORMAT
                  }
                },
                ticks
              },
              {
                position: 'bottom',
                ticks: {
                  source: 'data',
                  padding: 12
                },
                bounds: 'ticks',
                type: 'time',
                time: {
                  unit: 'day',
                  parser: PARSER_FORMAT,
                  displayFormats: {
                    day: range.id === '7d_ago' ? 'EEEEEE' : 'MMM d'
                  }
                },
                gridLines: {
                  drawBorder: false,
                  lineWidth: 1,
                  drawTicks: false,
                  zeroLineColor: colors.divider,
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
