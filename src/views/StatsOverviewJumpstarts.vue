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
            @updateSelectedOption="fetch_stats_overview"
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
              :stats_overview="get_stats_overview"
              :stats_overview_date_range="stats_overview_date_range"
            >
              <template #title><span class="block text-center">JumpStart Overview</span></template>
            </ChartsStatsOverview>
          </div>
        </div>

        <div class="container px-4 md:px-6 text-left mb-6">
          <h2 class="tg-body-emphasis-mobile lg:tg-body-emphasis-desktop mb-4" title="">
            Tag Usage
          </h2>

          <div>
            <ChartTagUsage
              :stats_overview="get_stats_overview"
              :stats_overview_date_range="stats_overview_date_range"
            />
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
import ChartsStatsOverview from '@/components/ChartsStatsOverview';
import ChartTagUsage from '@/components/ChartTagUsage.vue';
import BaseButtonPro from '@/components/BaseButtonPro';
import Calendar from '@/assets/calendar.svg';
import Stat from '@/assets/stat.svg';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { colors, opacity } from '@/constants/theme.js';
import { formatDate } from '@/helpers';
import { addDays, addYears } from 'date-fns';

export default {
  name: 'StatsOverviewJumpStarts',
  components: {
    BaseAppBarHeader,
    NavigationBottom,
    LayoutFixedFooter,
    BaseDropdown,
    ChartsStatsOverview,
    ChartTagUsage,
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
    ...mapMutations('email', ['update_stats_overview_date_range']),
    ...mapActions('email', ['fetch_stats_overview']),

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
    }
  }
};
</script>
