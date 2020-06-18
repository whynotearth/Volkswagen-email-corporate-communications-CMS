<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader :title="titleHeader" :toLink="{ name: 'JumpStartActivityList' }" />
    </template>
    <template #content>
      <div>
        <div class="container px-4 md:px-6 text-left pt-6">
          <!-- time -->
          <BaseDropdown
            class="relative bg-surface text-left mb-6"
            placeholder="Schedule time"
            :options="dateRangesAvailable"
            v-model="stats_overview_jumpstart_date_range"
            @updateSelectedOption="fetchStatsOverview"
          >
            <template #icon>
              <Calendar />
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
              v-if="get_stats_overview_jumpstart"
              :stats_overview="get_stats_overview_jumpstart"
              :stats_overview_date_range="stats_overview_jumpstart_date_range"
            >
              <template #title>
                <span class="block text-center tg-h2-mobile">
                  <span class="text-brand-light-blue-gradient">3258</span>
                  Recipients
                </span>
              </template>
              <template #description>
                <div class="flex w-full px-4 py-2 em-high">
                  <span class="tg-body-emphasis-mobile text-white mr-2">Distribution Group: </span>
                  <BaseChip :text="'communications'" />
                </div>
                <div class="flex w-full px-4 py-3 em-high">
                  <span class="tg-body-emphasis-mobile text-white mr-2">Subject: </span>
                  <span class="tg-body-mobile">Wednesday, 6 May 2020, 9:45 AM</span>
                </div>
                <div class="flex w-full px-4 py-3 mb-3 em-high">
                  <span class="tg-body-emphasis-mobile text-white mr-2">Delivered: </span>
                  <span class="tg-body-mobile">Wednesday, 6 May 2020, 9:45 AM</span>
                </div>
              </template>
            </ChartsStatsOverview>
          </div>
        </div>
        <div class="container px-0 md:px-6 text-left mb-6">
          <StatsUserActivity :title="'Activity'" :list="listOfActivity" />
        </div>

        <div class="container px-4 md:px-6 text-left mb-6">
          <h2 class="tg-body-emphasis-mobile lg:tg-body-emphasis-desktop mb-4" title="">
            Tag Usage
          </h2>

          <div>
            <ChartTagUsage
              v-if="get_stats_overview_jumpstart"
              :stats_overview="get_stats_overview_jumpstart"
              :stats_overview_date_range="stats_overview_jumpstart_date_range"
            />
          </div>
        </div>

        <div class="container px-4 md:px-6 text-left pb-6">
          <div class="mb-6">
            <!-- link button -->
            <BaseButtonPro :toLink="{ name: 'JumpStartActivityDetail', params: { id: jumpStartId } }">
              <template #icon>
                <Person class="inline-block align-baseline mr-4 h-5 w-5 -mb-0.5 pointer-events-none" />
              </template>
              View User Engagement
            </BaseButtonPro>
          </div>

          <a
            @click="exportReport()"
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
import StatsUserActivity from '@/components/StatsUserActivity';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseDropdown from '@/components/BaseDropdown';
import ChartsStatsOverview from '@/components/ChartsStatsOverview';
import ChartTagUsage from '@/components/ChartTagUsage.vue';
import BaseButtonPro from '@/components/BaseButtonPro';
import BaseChip from '@/components/BaseChip';
import Calendar from '@/assets/calendar.svg';
import Person from '@/assets/person.svg';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { colors, opacity } from '@/constants/theme.js';
import { formatDate } from '@/helpers';
import { addDays, addYears, formatISO } from 'date-fns';

// eslint-disable-next-line
const PARSER_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

export default {
  name: 'StatsOverviewJumpStart',
  components: {
    BaseAppBarHeader,
    NavigationBottom,
    LayoutFixedFooter,
    StatsUserActivity,
    BaseDropdown,
    ChartsStatsOverview,
    ChartTagUsage,
    BaseButtonPro,
    BaseChip,
    Calendar,
    Person
  },
  created() {
    this.fetchStatsOverview();
    if (!this.get_stats.length) {
      this.fetch_stats();
    }
  },
  computed: {
    ...mapGetters('email', ['get_stats', 'get_stats_overview_jumpstart_date_range', 'get_stats_overview_jumpstart']),
    stats_overview_jumpstart_date_range: {
      get() {
        const current = this.get_stats_overview_jumpstart_date_range;
        // default value
        if (!current.value.length > 0) {
          const last7days = this.dateRangesAvailable[0];
          return last7days;
        }
        return current;
      },
      set(value) {
        this.update_stats_overview_jumpstart_date_range(value);
      }
    },

    dateRangesAvailable() {
      return this.generateDateRangesAvailable();
    },
    jumpStartId() {
      return parseInt(this.$route.params.id);
    },
    stat() {
      return this.get_stats.find(p => p.id === this.jumpStartId);
    },
    titleHeader() {
      return this.stat ? formatDate(this.stat.dateTime) : '';
    }
  },
  data() {
    return {
      listOfActivity: [
        {
          name: 'Successful deliveries',
          value: '98%'
        },
        {
          name: 'Last opened',
          value: '6 May 2020, 9:44 PM'
        },
        {
          name: 'Forwarded',
          value: '0'
        },
        {
          name: 'Clicks per unique opens',
          value: '1'
        },
        {
          name: 'Total clicks',
          value: '1524'
        },
        {
          name: 'Last clicked',
          value: '2516'
        }
      ]
    };
  },
  methods: {
    ...mapMutations('email', ['update_stats_overview_jumpstart_date_range']),
    ...mapActions('email', ['fetch_stats_overview_jumpstart', 'fetch_stats', 'export_stats_overview_jumpstart']),

    fetchStatsOverview() {
      const range = this.stats_overview_jumpstart_date_range.value;

      this.fetch_stats_overview_jumpstart({
        params: {
          id: this.jumpStartId,
          fromDate: formatISO(new Date(range[0]), { representation: 'date' }),
          toDate: formatISO(new Date(range[1]), { representation: 'date' })
        }
      });
    },

    generateDateRangesAvailable() {
      const format = PARSER_FORMAT;
      // TODO: process all time better
      const allTimeStartDate = new Date('2020-05-27');
      const now = this.stat ? new Date(this.stat.dateTime) : new Date();
      const today = formatDate(now, format);
      const last7days = formatDate(addDays(now, -7), format);
      const last30days = formatDate(addDays(now, -30), format);
      const allTime = formatDate(allTimeStartDate, format);

      return [
        { id: '7d_ago', value: [last7days, today], text: 'Last 7 Days' },
        { id: '30d_ago', value: [last30days, today], text: 'Last 30 Days' },
        { id: 'all_time', value: [allTime, today], text: 'All Time' }
      ];
    },

    exportReport() {
      this.export_stats_overview_jumpstart({ id: this.jumpStartId });
    }
  }
};
</script>
