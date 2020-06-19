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
            v-model="dateRange"
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
              v-if="get_stats_overview_jumpstart"
              :stats_overview="get_stats_overview_jumpstart"
              :stats_overview_date_range="dateRange"
            >
              <template #title>
                <span class="block text-center tg-h2-mobile">
                  <span class="text-brand-light-blue-gradient">{{ get_stats_overview_jumpstart.recipientsCount }}</span>
                  Recipients
                </span>
              </template>
              <template #description>
                <div v-if="stat" class="flex w-full px-4 py-2 em-high">
                  <span class="tg-body-emphasis-mobile text-white mr-2">Distribution Group: </span>
                  <BaseChip isSmall="true" v-for="(item, index) in stat.distributionGroups" :key="index" :text="item" />
                </div>
                <div class="flex w-full px-4 py-3 em-high">
                  <span class="tg-body-emphasis-mobile text-white mr-2">Subject: </span>
                  <span class="tg-body-mobile">{{ subjectdDateTime }}</span>
                </div>
                <div class="flex w-full px-4 py-3 mb-3 em-high">
                  <span class="tg-body-emphasis-mobile text-white mr-2">Delivered: </span>
                  <span class="tg-body-mobile">{{ deliveredDateTime }}</span>
                </div>
              </template>
            </ChartsStatsOverview>
          </div>
        </div>
        <div class="container px-0 md:px-6 text-left mb-6">
          <StatsUserActivity
            v-if="get_stats_overview_jumpstart"
            :title="'Activity'"
            :fields="get_stats_overview_jumpstart"
          />
        </div>

        <div class="container px-4 md:px-6 text-left mb-6">
          <h2 class="tg-h3-mobile mb-4" title="">
            Tag Usage
          </h2>

          <p class="tg-caption-mobile text-black text-opacity-84 mb-2">Top 4 Tags by Usage</p>

          <div>
            <ChartTagUsage
              v-if="get_stats_overview_jumpstart"
              :stats_overview="get_stats_overview_jumpstart"
              :stats_overview_date_range="dateRange"
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
import { formatDate, statsOverviewGenerateDateRangesAvailable, statsOverviewDateRangeParamsGenerator } from '@/helpers';
import { addDays, addYears, formatISO } from 'date-fns';

const dateRangesAvailable = statsOverviewGenerateDateRangesAvailable();

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
  data: () => {
    return {
      dateRange: dateRangesAvailable.find(item => item.id === '7d_ago')
    };
  },
  created() {
    this.fetchStatsOverview();
    this.fetch_stats();
  },
  computed: {
    ...mapGetters('email', ['get_stats', 'get_stats_overview_jumpstart']),
    dateRangesAvailable() {
      return dateRangesAvailable;
    },
    jumpStartId() {
      return parseInt(this.$route.params.id);
    },
    stat() {
      return this.get_stats.find(p => p.id === this.jumpStartId);
    },
    titleHeader() {
      return this.stat ? formatDate(this.stat.dateTime, 'iiii, dd MMM, yyyy') : '';
    },
    deliveredDateTime() {
      return this.get_stats_overview_jumpstart.firstDeliverDateTime
        ? formatDate(this.get_stats_overview_jumpstart.firstDeliverDateTime, 'iiii, dd MMM yyyy, h:mm aaa')
        : '-';
    },
    subjectdDateTime() {
      return this.stat ? formatDate(this.stat.dateTime, 'iiii, dd MMM yyyy, h:mm aaa') : '-';
    }
  },
  methods: {
    ...mapMutations('email', ['update_stats_overview_jumpstart_date_range']),
    ...mapActions('email', ['fetch_stats_overview_jumpstart', 'fetch_stats', 'export_stats_overview_jumpstart']),

    fetchStatsOverview() {
      const payload = statsOverviewDateRangeParamsGenerator(this.dateRange);
      payload.params.id = this.jumpStartId;
      this.fetch_stats_overview_jumpstart(payload);
    },

    exportStatsOverview() {
      const payload = statsOverviewDateRangeParamsGenerator(this.dateRange);
      payload.params.id = this.jumpStartId;
      this.export_stats_overview_jumpstart(payload);
    }
  }
};
</script>
