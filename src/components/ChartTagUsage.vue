<template>
  <BaseChart :config="chartConfig" />
</template>

<script>
import { colors, opacity } from '@/constants/theme.js';
import BaseChart from '@/components/BaseChart';
import { cloneDeep, sortBy } from 'lodash-es';
const MAX_TAGS_TO_SHOW = 4;

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
      return slicedSortedTags;
    },
    stats() {
      let result = [];
      this.stats_overview.tags.forEach(item => {
        result = [...result, ...item.stats];
      });
      return result;
    },
    chartConfig() {
      const datasets = this.tags.map(tagData => {
        const data = this.adaptDataset(tagData.stats);
        const tagName = tagData.tag;
        const tagColor = colors[tagName.toLowerCase()] || 'gray';
        return {
          label: tagName,
          data,
          borderWidth: 2,
          backgroundColor: tagColor,
          borderColor: tagColor,
          fill: false
        };
      });
      const ticks = {
        source: 'data',
        fontColor: `rgba(0,0,0,${opacity['54']})`,
        fontSize: 12,
        callback: (value, index, values) => {
          return this.stats
            .filter(item => item.date === value)
            .map(item => item.count)
            .reduce((acc, current) => acc + current, 0);
        }
      };
      return this.getChartConfig({ datasets, ticks });
    }
  },
  methods: {
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
                  padding: 8
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
