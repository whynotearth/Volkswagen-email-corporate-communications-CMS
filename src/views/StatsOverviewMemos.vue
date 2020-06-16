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
            :options="dateRangesAvailable"
            v-model="stats_overview_date_range"
            @updateSelectedOption="fetchStatsOverview"
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
          <div class="bg-brand-gradient">
            <ChartsStatsOverview
              v-if="get_stats_overview"
              :stats_overview="get_stats_overview"
              :stats_overview_date_range="stats_overview_date_range"
            >
              <template #title><span class="block text-center">Memo Overview</span></template>
            </ChartsStatsOverview>
          </div>
        </div>

        <div class="container px-5 md:px-6 text-left mb-6">
          <BaseHeatmapChart :options="options" :series="series" />
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
import BaseHeatmapChart from '@/components/BaseHeatmapChart';
import ChartsStatsOverview from '@/components/ChartsStatsOverview';
import BaseButtonPro from '@/components/BaseButtonPro';
import Calendar from '@/assets/calendar.svg';
import Stat from '@/assets/stat.svg';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { colors, opacity } from '@/constants/theme.js';
import { formatDate } from '@/helpers';
import { addDays, addYears, formatISO } from 'date-fns';

// eslint-disable-next-line
const PARSER_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

export default {
  name: 'StatsOverviewMemos',
  components: {
    BaseAppBarHeader,
    NavigationBottom,
    LayoutFixedFooter,
    BaseDropdown,
    BaseHeatmapChart,
    ChartsStatsOverview,
    BaseButtonPro,
    Calendar,
    Stat
  },
  data() {
    return {
      options: {
        chart: {
          height: 350,
          type: 'heatmap',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          },
          selection: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#03B3F9'],
        stroke: {
          colors: ['#ffffff'],
          width: 8
        },
        fill: {
          opacity: 1
        },
        xaxis: {
          type: 'datetime',
          crosshairs: {
            show: false
          },
          labels: {
            rotate: 0,
            format: 'ddd',
            hideOverlappingLabels: false,
            offsetX: -16,
            offsetY: 0,
            style: {
              color: '#757575',
              fontFamily: 'VWText-Regular'
            }
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          opposite: true,
          labels: {
            style: {
              color: '#757575',
              fontFamily: 'VWText-Regular'
            }
          }
        },
        tooltip: {
          enabled: false
        },
        states: {
          normal: {
            filter: {
              type: 'none'
            }
          },
          hover: {
            filter: {
              type: 'none'
            }
          },
          active: {
            filter: {
              type: 'none'
            }
          }
        },
        plotOptions: {
          heatmap: {
            radius: 0,
            enableShades: false,
            shadeIntensity: 1,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 1,
                  color: '#EDEDED'
                },
                {
                  from: 1,
                  to: 15,
                  color: '#D9EFFF'
                },
                {
                  from: 15,
                  to: 30,
                  color: '#9EDEFD'
                },
                {
                  from: 30,
                  to: 45,
                  color: '#71D2FC'
                },
                {
                  from: 45,
                  to: 60,
                  color: '#3EC3FA'
                },
                {
                  from: 60,
                  to: 75,
                  color: '#03B3F9'
                }
              ]
            }
          }
        },
        grid: {
          show: false
        },
        legend: {
          position: 'bottom',
          markers: {
            width: 40,
            height: 10,
            radius: 0
          },
          formatter: function(label, opts) {
            return opts.w.config.plotOptions.heatmap.colorScale.ranges[opts.seriesIndex].to;
          }
        }
      },
      series: [
        {
          name: '10pm',
          data: [
            [1591488000000, 10], // new Date('2020-06-07').getTime()
            [1591574400000, 0], // new Date('2020-06-08').getTime()
            [1591660800000, 50], // new Date('2020-06-09').getTime()
            [1591833600000, 10], // new Date('2020-06-10').getTime()
            [1591920000000, 0], // new Date('2020-06-11').getTime()
            [1592006400000, 50], // new Date('2020-06-12').getTime()
            [1592092800000, 75] // new Date('2020-06-13').getTime()
          ]
        },
        {
          name: '8pm',
          data: [
            [1591488000000, 10],
            [1591660800000, 10],
            [1591747200000, 50],
            [1591833600000, 70],
            [1591920000000, 10],
            [1592006400000, 0],
            [1592092800000, 75]
          ]
        },
        {
          name: '6pm',
          data: [
            [1591574400000, 70],
            [1591660800000, 0],
            [1591747200000, 60],
            [1591833600000, 0],
            [1591920000000, 20],
            [1592006400000, 0],
            [1592092800000, 30]
          ]
        },
        {
          name: '4pm',
          data: [
            [1591574400000, 50],
            [1591660800000, 7],
            [1591747200000, 40],
            [1591833600000, 18],
            [1591920000000, 0],
            [1592006400000, 32],
            [1592092800000, 0]
          ]
        },
        {
          name: '2pm',
          data: [
            [1591574400000, 5],
            [1591660800000, 65],
            [1591747200000, 0],
            [1591833600000, 16],
            [1591920000000, 77],
            [1592006400000, 0],
            [1592092800000, 0]
          ]
        },
        {
          name: '12pm',
          data: [
            [1591574400000, 25],
            [1591660800000, 0],
            [1591747200000, 5],
            [1591833600000, 0],
            [1591920000000, 7],
            [1592006400000, 0],
            [1592092800000, 0]
          ]
        },
        {
          name: '10am',
          data: [
            [1591574400000, 0],
            [1591660800000, 8],
            [1591747200000, 14],
            [1591833600000, 0],
            [1591920000000, 0],
            [1592006400000, 0],
            [1592092800000, 40]
          ]
        },
        {
          name: '8am',
          data: [
            [1591574400000, 0],
            [1591660800000, 55],
            [1591747200000, 0],
            [1591833600000, 0],
            [1591920000000, 13],
            [1592006400000, 0],
            [1592092800000, 0]
          ]
        },
        {
          name: '6am',
          data: [
            [1591574400000, 0],
            [1591660800000, 5],
            [1591747200000, 0],
            [1591833600000, 0],
            [1591920000000, 13],
            [1592006400000, 0],
            [1592092800000, 70]
          ]
        },
        {
          name: '4am',
          data: [
            [1591574400000, 0],
            [1591660800000, 5],
            [1591747200000, 0],
            [1591833600000, 0],
            [1591920000000, 13],
            [1592006400000, 0],
            [1592092800000, 0]
          ]
        },
        {
          name: '2am',
          data: [
            [1591574400000, 30],
            [1591660800000, 5],
            [1591747200000, 0],
            [1591833600000, 0],
            [1591920000000, 73],
            [1592006400000, 0],
            [1592092800000, 40]
          ]
        },
        {
          name: '12am',
          data: [
            [1591574400000, 0],
            [1591660800000, 5],
            [1591747200000, 0],
            [1591833600000, 0],
            [1591920000000, 13],
            [1592006400000, 0],
            [1592092800000, 50]
          ]
        }
      ]
    };
  },
  created() {
    this.fetchStatsOverview();
  },
  computed: {
    ...mapGetters('memo', ['get_stats_overview_date_range', 'get_stats_overview']),
    stats_overview_date_range: {
      get() {
        const current = this.get_stats_overview_date_range;
        // default value
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

    dateRangesAvailable() {
      return this.generateDateRangesAvailable();
    }
  },

  methods: {
    ...mapMutations('memo', ['update_stats_overview_date_range']),
    ...mapActions('memo', ['fetch_stats_overview']),

    fetchStatsOverview() {
      const range = this.stats_overview_date_range.value;

      this.fetch_stats_overview({
        params: {
          fromDate: formatISO(new Date(range[0]), { representation: 'date' }),
          toDate: formatISO(new Date(range[1]), { representation: 'date' })
        }
      });
    },

    generateDateRangesAvailable() {
      const format = PARSER_FORMAT;
      const allTimeStartDate = new Date('2020-05-27');
      const now = new Date();
      const today = formatDate(now, format);
      const last7days = formatDate(addDays(now, -7), format);
      const last30days = formatDate(addDays(now, -30), format);
      const allTime = formatDate(allTimeStartDate, format);

      return [
        { id: '7d_ago', value: [last7days, today], text: 'Last 7 Days' },
        { id: '30d_ago', value: [last30days, today], text: 'Last 30 Days' },
        { id: 'all_time', value: [allTime, today], text: 'All Time' }
      ];
    }
  }
};
</script>
