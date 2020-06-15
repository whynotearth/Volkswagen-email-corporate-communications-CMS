<template>
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
            :options="dates"
            v-model="date"
          >
            <template #icon>
              <Calendar />
            </template>
            <template #title="{ selectedOption }">
              <span v-if="dates.length === 0" class="text-gray-500">
                No Option!
              </span>
              <span v-else-if="selectedOption" class="text-black">
                {{ selectedOption }}
              </span>
            </template>
            <template #option="{ option }">
              <span>
                {{ option }}
              </span>
            </template>
          </BaseDropdown>
        </div>

        <div class="container px-0 md:px-6 text-left mb-6">
          <!-- chart -->
          <div class="bg-brand-gradient">
            <StatsOverview
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

// temporary data
const usersData = [200, 400, 600, 300, 500, 800, 1000];
const opensData = [100, 500, 100, 200, 300, 800, 900];
const clicksData = [500, 400, 200, 800, 600, 900, 1100];
const tagUsageData1 = [1, 2, 3, 1, 2, 3, 1];
const tagUsageData2 = [2, 3, 1, 2, 3, 1, 4];
const tagUsageData3 = [2, 3, 3, 2, 3, 1, 1];
const tagUsageData4 = [3, 1, 2, 3, 1, 2, 2];

export default {
  name: 'StatsOverviewMemos',
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
  computed: {
    ...mapGetters('memo', ['get_date']),
    date: {
      get() {
        return this.get_date;
      },
      set(value) {
        this.update_date(value);
      }
    },
    dates() {
      return ['Last 7', 'Last 30', 'all time'];
    },
    usersChartConfig() {
      const datasets = [
        {
          label: 'Users',
          data: usersData,
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
          return datasets[0][index];
        }
      };
      return this.getChartConfig({ datasets, ticks });
    },
    opensChartConfig() {
      const datasets = [
        {
          label: 'Opens',
          data: opensData,
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
          return datasets[0][index];
        }
      };
      return this.getChartConfig({ datasets, ticks });
    },
    clicksChartConfig() {
      const datasets = [
        {
          label: 'Clicks',
          data: clicksData,
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
          return datasets[0][index];
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
    ...mapMutations('memo', ['update_date']),

    getChartConfig({ label, datasets, ticks, showLegend = false }) {
      const config = {
        type: 'line',
        data: {
          labels: ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'],
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
