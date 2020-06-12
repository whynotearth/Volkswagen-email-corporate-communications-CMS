<template>
  <div class="stats-overview flex flex-wrap text-white py-4">
    <h2 class="tg-caption-bold-desktop em-high text-white w-full m-4">
      <slot name="title"></slot>
    </h2>
    <slot name="description"></slot>
    <BaseTabs class="w-full" :tabClasses="'text-right'">
      <template #Users class="text-left">
        <span class="text-brand-light-blue-gradient tg-h1-mobile">{{ usersStats.userCount }}</span>
        <span class="flex items-center text-community">
          <ArrowUp class="mr-2" /><span>{{ usersStats.userGrowthPercent }}%</span></span
        >
      </template>
      <BaseTab name="Users" selected="true">
        <BaseChart :config="usersChartConfig" />
      </BaseTab>

      <template #Opens>
        <span class="text-brand-light-blue-gradient tg-h1-mobile">{{ opensStats.openCount }}</span>
        <span class="flex items-center text-error">
          <ArrowDown class="mr-2" /><span>{{ opensStats.openGrowthPercent }}%</span></span
        >
      </template>
      <BaseTab name="Opens">
        <BaseChart :config="opensChartConfig" />
      </BaseTab>

      <template #Clicks>
        <span class="text-brand-light-blue-gradient tg-h1-mobile">{{ clicksStats.clickCount }}</span>
        <span class="flex items-center text-community">
          <ArrowUp class="mr-2" /><span>{{ clicksStats.clickGrowthPercent }}%</span></span
        >
      </template>
      <BaseTab name="Clicks">
        <BaseChart :config="clicksChartConfig" />
      </BaseTab>
    </BaseTabs>
  </div>
</template>

<script>
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';
import BaseChart from '@/components/BaseChart.vue';
import ArrowDown from '@/assets/arrow-down-red.svg';
import ArrowUp from '@/assets/arrow-up.svg';
import { colors, opacity } from '@/constants/theme.js';
import { formatDate } from '@/helpers';

export default {
  name: 'ChartsStatsOverview',
  components: {
    BaseTabs,
    BaseTab,
    BaseChart,
    ArrowDown,
    ArrowUp
  },
  props: {
    stats_overview: {
      type: Object
    },
    stats_overview_date_range: {
      type: Object
    }
  },
  computed: {
    usersStats() {
      const { userCount, userGrowthPercent, users } = this.stats_overview;
      return { userCount, userGrowthPercent, users };
    },
    opensStats() {
      const { openCount, openGrowthPercent, opens } = this.stats_overview;
      return { openCount, openGrowthPercent, opens };
    },
    clicksStats() {
      const { clickCount, clickGrowthPercent, clicks } = this.stats_overview;
      return { clickCount, clickGrowthPercent, clicks };
    },

    usersChartConfig() {
      const data = this.adaptOverviewChartDataset(this.usersStats.users);
      const datasets = [
        {
          data,
          label: 'Users',
          borderWidth: 2,
          backgroundColor: 'transparent',
          borderColor: colors.secondary,
          fill: false
        }
      ];
      const ticks = {
        source: 'data',
        fontColor: `rgba(255,255,255,${opacity['54']})`,
        fontSize: 12,
        callback: (value, index, values) => {
          return data[index].y;
        }
      };
      return this.getChartConfig({ datasets, ticks });
    },
    opensChartConfig() {
      const data = this.adaptOverviewChartDataset(this.opensStats.opens);
      const datasets = [
        {
          data,
          label: 'Opens',
          borderWidth: 2,
          backgroundColor: 'transparent',
          borderColor: colors.secondary,
          fill: false
        }
      ];
      const ticks = {
        source: 'data',
        fontColor: `rgba(255,255,255,${opacity['54']})`,
        fontSize: 12,
        callback: (value, index, values) => {
          return data[index].y;
        }
      };
      return this.getChartConfig({ datasets, ticks });
    },
    clicksChartConfig() {
      const data = this.adaptOverviewChartDataset(this.clicksStats.clicks);
      const datasets = [
        {
          data,
          label: 'Clicks',
          borderWidth: 2,
          backgroundColor: 'transparent',
          borderColor: colors.secondary,
          fill: false
        }
      ];
      const ticks = {
        source: 'data',
        fontColor: `rgba(255,255,255,${opacity['54']})`,
        fontSize: 12,
        callback: (value, index, values) => {
          return data[index].y;
        }
      };
      return this.getChartConfig({ datasets, ticks });
    }
  },

  methods: {
    adaptOverviewChartDataset(inputData) {
      return inputData.map(item => ({ t: item.date, y: item.count }));
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

<style scoped>
.text-brand-light-blue-gradient {
  background: -webkit-linear-gradient(#0374f9, #03b3f9);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stats-overview >>> {
  .tabs .shadow-4dp {
    @apply shadow-none;
  }

  .tabs li:not(:first-child) {
    border-left: 1px solid rgba(255, 255, 255, 0.12);
  }

  .tabs li:not(.border-secondary) {
    @apply border-white border-b-1 border-opacity-12;
  }

  .tabs li a {
    @apply text-left !important;
    @apply normal-case;
  }
}
</style>
