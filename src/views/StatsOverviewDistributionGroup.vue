<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader :title="distributionGroupName" :toLink="{ name: 'Stats' }" />
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
              v-if="get_stats_overview"
              :stats_overview="get_stats_overview"
              :stats_overview_date_range="dateRange"
            >
              <template #title
                ><span class="block text-center">{{ distributionGroupName }}</span></template
              >
            </ChartsStatsOverview>
          </div>
        </div>

        <div class="container px-4 md:px-6 text-left pb-6">
          <div class="mb-6">
            <!-- link button -->
            <BaseButtonPro :toLink="{ name: 'EmailList', params: { groupName: distributionGroupName } }">
              <template #icon>
                <Stat class="inline-block align-baseline mr-4 h-5 w-5 -mb-0.5 pointer-events-none" />
              </template>
              View Users
            </BaseButtonPro>
          </div>

          <a
            @click="exportStatsOverview"
            class="mb-6 bg-secondary block w-full mx-auto hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile shadow-2dp max-w-sm cursor-pointer"
            >Export Report</a
          >

          <router-link
            :to="{ name: 'EmailListEdit', params: { groupName: distributionGroupName } }"
            class="mb-6 bg-secondary block w-full mx-auto hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile shadow-2dp max-w-sm cursor-pointer"
            >Edit List Name</router-link
          >

          <a
            @click="deleteList()"
            class="block w-full mx-auto text-error text-center font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile max-w-sm cursor-pointer"
            >Delete List</a
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
import BaseButtonPro from '@/components/BaseButtonPro';
import Calendar from '@/assets/calendar.svg';
import Stat from '@/assets/stat.svg';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { colors, opacity } from '@/constants/theme.js';
import {
  formatDate,
  showOverlayAndRedirect,
  statsOverviewGenerateDateRangesAvailable,
  statsOverviewDateRangeParamsGenerator
} from '@/helpers';
import { addDays, addYears, formatISO } from 'date-fns';

const dateRangesAvailable = statsOverviewGenerateDateRangesAvailable();

export default {
  name: 'StatsOverviewDistributionGroup',
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
  data: () => {
    return {
      dateRange: dateRangesAvailable.find(item => item.id === '7d_ago')
    };
  },
  created() {
    this.fetchStatsOverview();
  },
  computed: {
    ...mapGetters('distributionGroup', ['get_stats_overview']),
    distributionGroupName() {
      return this.$route.params.groupName;
    },
    dateRangesAvailable() {
      return dateRangesAvailable;
    }
  },

  methods: {
    ...mapActions('distributionGroup', ['fetch_stats_overview', 'export_stats_overview', 'delete_group']),

    exportStatsOverview() {
      this.export_stats_overview(statsOverviewDateRangeParamsGenerator(this.dateRange));
    },
    fetchStatsOverview() {
      this.fetch_stats_overview(statsOverviewDateRangeParamsGenerator(this.dateRange));
    },

    async deleteList() {
      if (confirm('Are you sure?')) {
        await this.delete_group(this.distributionGroupName);
        showOverlayAndRedirect({ title: 'Success!', route: { name: 'EmailLists' } });
      }
    }
  }
};
</script>
