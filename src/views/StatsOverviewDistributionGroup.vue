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
              <template #title
                ><span class="block text-center">{{ distributionGroupName }}</span></template
              >
            </ChartsStatsOverview>
          </div>
        </div>

        <div class="container px-4 md:px-6 text-left pb-6">
          <div class="mb-6">
            <!-- link button -->
            <BaseButtonPro :toLink="{ name: 'UserList', params: { groupName: distributionGroupName } }">
              <template #icon>
                <Stat class="inline-block align-baseline mr-4 h-5 w-5 -mb-0.5 pointer-events-none" />
              </template>
              View Users
            </BaseButtonPro>
          </div>

          <a
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
import { formatDate, showOverlayAndRedirect } from '@/helpers';
import { addDays, addYears, formatISO } from 'date-fns';

// eslint-disable-next-line
const PARSER_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

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
  created() {
    this.fetchStatsOverview();
  },
  computed: {
    ...mapGetters('distributionGroup', ['get_stats_overview_date_range', 'get_stats_overview']),
    distributionGroupName() {
      return this.$route.params.groupName;
    },
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
    ...mapMutations('distributionGroup', ['update_stats_overview_date_range']),
    ...mapActions('distributionGroup', ['fetch_stats_overview', 'delete_group']),

    async deleteList() {
      if (confirm('Are you sure?')) {
        await this.delete_group(this.distributionGroupName);
        showOverlayAndRedirect({ title: 'Success!', route: { name: 'EmailLists' } });
      }
    },

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
