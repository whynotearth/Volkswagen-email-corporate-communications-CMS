<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader :title="'Memo Overview'" :toLink="{ name: 'Stats' }" />
    </template>
    <template #content>
      <div class="flex flex-col">
        <div class="container px-0 py-4 md:px-6 select-none">
          <BaseDropdown
            class="relative bg-surface text-left m-4"
            placeholder="Schedule time"
            :options="dates"
            :icon="'https://res.cloudinary.com/whynotearth/image/upload/v1591633121/Volkswagen/cms/calendar_v7nvia.png'"
            v-model="date"
          >
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
          <OverviewStats>
            <template #title>Memo Overview</template>
          </OverviewStats>
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
import OverviewStats from '@/components/OverviewStats';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { formatDate } from '@/helpers.js';

export default {
  name: 'StatsOverviewMemos',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedFooter, BaseDropdown, OverviewStats },
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
    }
  },
  methods: {
    ...mapMutations('memo', ['update_date']),
    formatDate
  }
};
</script>
