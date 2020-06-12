<template>
  <!-- TODO: rename file to StatsOverviewJumpStarts.vue -->
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader :title="'JumpStart Overview'" :toLink="{ name: 'Stats' }" />
    </template>
    <template #content>
      <div>
        <div class="container px-4 md:px-6 text-left pt-6">
          <!-- time -->
          <BaseDropdown
            class="relative bg-surface text-left mb-6"
            placeholder="Schedule time"
            :options="dateRangesAvailable"
            v-model="stats_overview_date_range"
            @updateSelectedOption="onUpdateDateRange"
          >
            <template #icon>
              <Calendar class="inline-block align-baseline mr-4 h-5 w-5 -mb-0.5 pointer-events-none" />
            </template>
            <template #title="{ selectedOption }">
              <span class="text-black">
                {{ selectedOption.text }}
              </span>
            </template>
            <template #option="{ option }">
              <span>
                {{ option.text }}
              </span>
            </template>
          </BaseDropdown>
        </div>

        <div class="container px-0 md:px-6 text-left mb-6">
          <!-- chart -->
          <div class="bg-brand-gradient">
            <StatsOverview
              :usersStats="usersStats"
              :opensStats="opensStats"
              :clicksStats="clicksStats"
              :usersChartConfig="usersChartConfig"
              :opensChartConfig="opensChartConfig"
              :clicksChartConfig="clicksChartConfig"
            >
              <template #title><span class="block text-center">JumpStart Overview</span></template>
            </StatsOverview>
          </div>
        </div>

        <div class="container px-4 md:px-6 text-left mb-6">
          <h2 class="tg-body-emphasis-mobile lg:tg-body-emphasis-desktop mb-4" title="">
            Tag Usage
          </h2>

          <div>
            <!-- chart -->
            <BaseChart :config="tagUsageChartConfig" />
          </div>
        </div>

        <div class="container px-4 md:px-6 text-left pb-6">
          <div class="mb-6">
            <!-- link button -->
            <BaseButtonPro :toLink="{ name: 'JumpStartActivityList' }">
              <template #icon>
                <Stat class="inline-block align-baseline mr-4 h-5 w-5 -mb-0.5 pointer-events-none" />
              </template>
              View Reports
            </BaseButtonPro>
          </div>

          <a
            class="bg-secondary block w-full mx-auto hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile shadow-2dp max-w-sm"
            >Export Report</a
          >
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<script>
import LayoutFixedFooter from '@/components/LayoutFixedFooter';
import NavigationBottom from '@/components/BaseNavigationBottom';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseDropdown from '@/components/BaseDropdown';
import StatsOverview from '@/components/StatsOverview';
import BaseChart from '@/components/BaseChart.vue';
import BaseButtonPro from '@/components/BaseButtonPro';
import Calendar from '@/assets/calendar.svg';
import Stat from '@/assets/stat.svg';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { colors, opacity } from '@/constants/theme.js';
import { formatDate } from '@/helpers';
import { addDays, addYears } from 'date-fns';

// temporary data
const usersData = [200, 400, 600, 300, 500, 800, 1000];
const opensData = [100, 500, 100, 200, 300, 800, 900];
const clicksData = [500, 400, 200, 800, 600, 900, 1100];
const tagUsageData1 = [1, 2, 3, 1, 2, 3, 1];
const tagUsageData2 = [2, 3, 1, 2, 3, 1, 4];
const tagUsageData3 = [2, 3, 3, 2, 3, 1, 1];
const tagUsageData4 = [3, 1, 2, 3, 1, 2, 2];

export default {
  name: 'StatsOverviewJumpStarts',
  components: {
    BaseAppBarHeader,
    NavigationBottom,
    LayoutFixedFooter,
    BaseDropdown,
    StatsOverview,
    BaseChart,
    BaseButtonPro,
    Calendar,
    Stat
  },
  created() {
    this.fetch_stats_overview();
  },
  computed: {
    ...mapGetters('email', ['get_stats_overview_date_range', 'get_stats_overview']),
    stats_overview_date_range: {
      get() {
        const current = this.get_stats_overview_date_range;
        if (!current.value.length > 0) {
          const last7days = this.dateRangesAvailable[0];
          return last7days;
        }
        return current;
      },
      set(value) {
        this.update_stats_overview_date_range(value);
      }
    },
    usersStats() {
      const { userCount, userGrowthPercent, users } = this.get_stats_overview;
      return { userCount, userGrowthPercent, users };
    },
    opensStats() {
      const { openCount, openGrowthPercent, opens } = this.get_stats_overview;
      return { openCount, openGrowthPercent, opens };
    },
    clicksStats() {
      const { clickCount, clickGrowthPercent, clicks } = this.get_stats_overview;
      return { clickCount, clickGrowthPercent, clicks };
    },
    dateRangesAvailable() {
      return this.generateDateRangesAvailable();
    },
    usersChartConfig() {
      const data = this.adaptOverviewChartDataset(this.usersStats.users);
      const labels = this.adaptChartLabels(this.usersStats.users, this.stats_overview_date_range);
      const datasets = [
        {
          label: 'Users',
          data,
          borderWidth: 2,
          backgroundColor: 'transparent',
          borderColor: colors.secondary,
          fill: false
        }
      ];
      const ticks = {
        fontColor: `rgba(255,255,255,${opacity['54']})`,
        fontSize: 12,
        callback: (value, index, values) => {
          return data[index].y;
        }
      };
      return this.getChartConfig({ labels, datasets, ticks });
    },
    opensChartConfig() {
      const data = this.adaptOverviewChartDataset(this.opensStats.opens);
      const datasets = [
        {
          label: 'Opens',
          data,
          borderWidth: 2,
          backgroundColor: 'transparent',
          borderColor: colors.secondary,
          fill: false
        }
      ];
      const ticks = {
        fontColor: `rgba(255,255,255,${opacity['54']})`,
        fontSize: 12,
        callback: (value, index, values) => {
          return data[index];
        }
      };
      return this.getChartConfig({ datasets, ticks });
    },
    clicksChartConfig() {
      const data = this.adaptOverviewChartDataset(this.clicksStats.clicks);
      const datasets = [
        {
          label: 'Clicks',
          data,
          borderWidth: 2,
          backgroundColor: 'transparent',
          borderColor: colors.secondary,
          fill: false
        }
      ];
      const ticks = {
        fontColor: `rgba(255,255,255,${opacity['54']})`,
        fontSize: 12,
        callback: (value, index, values) => {
          return data[index];
        }
      };
      return this.getChartConfig({ datasets, ticks });
    },
    tagUsageChartConfig() {
      const datasets = [
        {
          label: 'Priority',
          data: tagUsageData1,
          borderWidth: 2,
          backgroundColor: colors.priority,
          borderColor: colors.priority,
          fill: false
        },
        {
          label: 'One Team',
          data: tagUsageData2,
          borderWidth: 2,
          backgroundColor: colors.oneteam,
          borderColor: colors.oneteam,
          fill: false
        },
        {
          label: 'People',
          data: tagUsageData3,
          borderWidth: 2,
          backgroundColor: colors.people,
          borderColor: colors.people,
          fill: false
        },
        {
          label: 'Plant',
          data: tagUsageData4,
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
    }
  },

  methods: {
    ...mapMutations('email', ['update_stats_overview_date_range']),
    ...mapActions('email', ['fetch_stats_overview']),

    onUpdateDateRange(newvalue) {
      console.log('newvalue', newvalue);
    },
    adaptOverviewChartDataset(inputData) {
      return inputData.map(item => ({ t: item.date, y: item.count }));
    },
    adaptChartLabels(inputData, range) {
      console.log('adaptChartLabels', inputData, range);

      let format = 'd';
      if (range.id === '7d_ago') {
        format = 'EEEEEE';
      }
      if (range.id === '30d_ago') {
        format = 'd';
      }
      return inputData.map(item => {
        const date = new Date(item.date);
        return formatDate(date, format);
      });
    },
    generateDateRangesAvailable() {
      const format = 'yyyy-MM-dd';
      const now = new Date();
      const today = formatDate(now, format);
      const last7days = formatDate(addDays(now, -7), format);
      const last30days = formatDate(addDays(now, -30), format);
      const allTime = formatDate(addYears(now, -50), format);

      return [
        { id: '7d_ago', value: [last7days, today], text: 'Last 7 Days' },
        { id: '30d_ago', value: [last30days, today], text: 'Last 30 Days' },
        { id: 'all_time', value: [allTime, today], text: 'All Time' }
      ];
    },
    getChartConfig({ labels, datasets, ticks, showLegend = false }) {
      const config = {
        type: 'line',
        data: {
          labels,
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
                ticks: {
                  source: 'data'
                },
                bounds: 'ticks',
                type: 'time',
                time: {
                  // min: new Date('2020-6-1'),
                  // max: new Date('2020-7-1'),
                  unit: 'week',
                  parser: 'yyyy-MM-dd',
                  displayFormats: {
                    millisecond: 'MMM d',
                    second: 'MMM d',
                    minute: 'MMM d',
                    hour: 'MMM d',
                    day: 'MMM d',
                    week: 'MMM d yyyy',
                    month: 'MMM d',
                    quarter: 'MMM d',
                    year: 'MMM d'
                  }
                },
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
                ticks
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
