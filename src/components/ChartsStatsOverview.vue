<template>
  <div class="stats-overview flex flex-wrap text-white py-4">
    <h2 class="tg-h2-mobile em-high text-white text-opacity-84 w-full m-4">
      <slot name="title"></slot>
    </h2>
    <slot name="description"></slot>
    <BaseTabs class="w-full" tabsContainerClasses="container px-0" tabLinkClasses="px-6 text-left">
      <template #Users="{isActive}" class="text-left">
        <span class="block tg-body-emphasis-mobile mb-1 pt-4 normal-case">Users</span>
        <span class="text-brand-light-blue-gradient" :class="[isActive ? 'tg-h1-mobile' : 'inactive-number-font']">{{
          usersStats.userCount
        }}</span>
        <span
          class="flex items-center tg-caption-mobile pb-4"
          :class="isGrowthPositive(usersStats.userGrowthPercent) ? 'text-success' : 'text-error'"
        >
          <ArrowUp v-if="isGrowthPositive(usersStats.userGrowthPercent)" class="mr-2" /><ArrowDown
            v-else=""
            class="mr-2"
          /><span>{{ usersStats.userGrowthPercent }}%</span></span
        >
      </template>
      <!-- Child users: -->
      <BaseTab name="Users" selected="true">
        <BaseChart :config="usersChartConfig" />
      </BaseTab>

      <template #Opens="{isActive}">
        <span class="block tg-body-emphasis-mobile mb-1 pt-4 normal-case">Opens</span>
        <span class="text-brand-light-blue-gradient" :class="[isActive ? 'tg-h1-mobile' : 'inactive-number-font']">{{
          opensStats.openCount
        }}</span>
        <span
          class="flex items-center tg-caption-mobile pb-4"
          :class="isGrowthPositive(opensStats.openGrowthPercent) ? 'text-success' : 'text-error'"
        >
          <ArrowUp v-if="isGrowthPositive(opensStats.openGrowthPercent)" class="mr-2" /><ArrowDown
            v-else=""
            class="mr-2"
          /><span>{{ opensStats.openGrowthPercent }}%</span></span
        >
      </template>
      <!-- Child opens -->
      <BaseTab name="Opens">
        <BaseChart :config="opensChartConfig" />
      </BaseTab>

      <template #Clicks="{isActive}">
        <span class="block tg-body-emphasis-mobile mb-1 pt-4 normal-case">Clicks</span>
        <span class="text-brand-light-blue-gradient" :class="[isActive ? 'tg-h1-mobile' : 'inactive-number-font']">{{
          clicksStats.clickCount
        }}</span>
        <span
          class="flex items-center tg-caption-mobile pb-4"
          :class="isGrowthPositive(clicksStats.clickGrowthPercent) ? 'text-success' : 'text-error'"
        >
          <ArrowUp v-if="isGrowthPositive(clicksStats.clickGrowthPercent)" class="mr-2" /><ArrowDown
            v-else=""
            class="mr-2"
          /><span>{{ clicksStats.clickGrowthPercent }}%</span></span
        >
      </template>
      <!-- Child clicks -->
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
import { get } from 'lodash-es';

// eslint-disable-next-line
const PARSER_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

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
      const data = this.adaptDataset(this.usersStats.users);
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
          return get(data, `[${index}].y`, '');
        }
      };
      return this.getChartConfig({ datasets, ticks });
    },
    opensChartConfig() {
      const data = this.adaptDataset(this.opensStats.opens);
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
          return get(data, `[${index}].y`, '');
        }
      };
      return this.getChartConfig({ datasets, ticks });
    },
    clicksChartConfig() {
      const data = this.adaptDataset(this.clicksStats.clicks);
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
          return get(data, `[${index}].y`, '');
        }
      };
      return this.getChartConfig({ datasets, ticks });
    }
  },

  methods: {
    isGrowthPositive(growthPercent) {
      return growthPercent >= 0;
    },
    adaptDataset(inputData) {
      return inputData.map(item => ({ t: item.date, y: item.count }));
    },
    getChartConfig({ datasets, ticks, showLegend = false, range = this.stats_overview_date_range }) {
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
                // https://www.chartjs.org/docs/latest/axes/cartesian/time.html
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
                  color: `rgba(255,255,255,${opacity['12']})`
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
  background: -webkit-linear-gradient(90deg, #0374f9 0%, #03b3f9 100%);
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
}

.inactive-number-font {
  font-family: 'VWHead-Regular', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 39px;
}
</style>
