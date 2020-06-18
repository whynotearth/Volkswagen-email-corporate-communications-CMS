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
              v-if="get_stats_overview"
              :stats_overview="get_stats_overview"
              :stats_overview_date_range="stats_overview_date_range"
            >
              <template #title><span class="block text-center">JumpStart Overview</span></template>
            </ChartsStatsOverview>
          </div>
        </div>

        <div class="container px-4 md:px-6 text-left mb-6">
          <h2 class="tg-h3-mobile mb-4" title="">
            Tag Usage
          </h2>

          <p class="tg-caption-mobile text-black text-opacity-84 mb-2">Top 4 Tags by Usage</p>

          <div>
            <ChartTagUsage
              v-if="get_stats_overview"
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
            @click="exportStatsOverview"
            class="mb-6 bg-secondary block w-full mx-auto hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile shadow-2dp max-w-sm cursor-pointer"
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
import { formatDate, statsOverviewGenerateDateRangesAvailable, statsOverviewDateRangeParamsGenerator } from '@/helpers';
import { addDays, addYears, formatISO } from 'date-fns';

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
    this.fetchStatsOverview();
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
      return this.statsOverviewGenerateDateRangesAvailable();
    },

    dateRangeParamsGenerator() {
      return statsOverviewDateRangeParamsGenerator({
        range: this.stats_overview_date_range.value,
        isAllTime: this.get_stats_overview_date_range.id === 'all_time'
      });
    }
  },

  methods: {
    ...mapMutations('email', ['update_stats_overview_date_range']),
    ...mapActions('email', ['fetch_stats_overview', 'export_stats_overview']),

    statsOverviewGenerateDateRangesAvailable,

    exportStatsOverview() {
      this.export_stats_overview(this.dateRangeParamsGenerator);
    },

    fetchStatsOverview() {
      this.fetch_stats_overview(this.dateRangeParamsGenerator);
    }
  }
};
</script>
