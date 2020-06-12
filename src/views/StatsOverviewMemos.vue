<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader :title="'Memo Overview'" :toLink="{ name: 'Stats' }" />
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
              <Calendar class="inline-block align-baseline mr-4 h-5 w-5 -mb-0.5 pointer-events-none" />
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
            <ChartsStatsOverview
              :usersChartConfig="usersChartConfig"
              :opensChartConfig="opensChartConfig"
              :clicksChartConfig="clicksChartConfig"
            >
              <template #title><span class="block text-center">Memo Overview</span></template>
            </ChartsStatsOverview>
          </div>
        </div>

        <div class="container px-4 md:px-6 text-left pb-6">
          <div class="mb-6">
            <!-- link button -->
            <BaseButtonPro :toLink="{ name: 'MemoListActivity' }">
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
import ChartsStatsOverview from '@/components/ChartsStatsOverview';
import BaseChart from '@/components/BaseChart.vue';
import BaseButtonPro from '@/components/BaseButtonPro';
import Calendar from '@/assets/calendar.svg';
import Stat from '@/assets/stat.svg';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { colors, opacity } from '@/constants/theme.js';

// temporary data
const usersData = [100, 500, 100, 200, 300, 800, 900];
const opensData = [100, 500, 100, 200, 300, 800, 900];
const clicksData = [100, 500, 100, 200, 300, 800, 900];

export default {
  name: 'StatsOverviewMemos',
  components: {
    BaseAppBarHeader,
    NavigationBottom,
    LayoutFixedFooter,
    BaseDropdown,
    ChartsStatsOverview,
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
      return this.getChartConfig({ label: 'Users', data: usersData });
    },
    opensChartConfig() {
      return this.getChartConfig({ label: 'Opens', data: opensData });
    },
    clicksChartConfig() {
      return this.getChartConfig({ label: 'Clicks', data: clicksData });
    }
  },
  data: () => ({
    // TODO: read from store
    usersData: [100, 500, 100, 200, 300, 800, 900]
  }),
  methods: {
    ...mapMutations('memo', ['update_date']),
    getChartConfig({ label, data }) {
      const config = {
        type: 'line',
        data: {
          labels: ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'],
          datasets: [
            {
              label,
              data,
              borderWidth: 2,
              backgroundColor: 'transparent',
              borderColor: colors.secondary,
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
                  fontColor: `rgba(255,255,255,${opacity['54']})`,
                  fontSize: 12,
                  callback: function(value, index, values) {
                    return data[index];
                  }
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
