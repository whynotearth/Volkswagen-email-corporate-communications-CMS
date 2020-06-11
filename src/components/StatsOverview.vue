<template>
  <div class="stats-overview flex flex-wrap text-white py-4">
    <h2 class="tg-caption-bold-desktop em-high text-white w-full m-4">
      <slot name="title"></slot>
    </h2>
    <slot name="description"></slot>
    <BaseTabs class="w-full" :tabClasses="'text-right'">
      <template #Users class="text-left">
        <span class="text-brand-light-blue-gradient tg-h1-mobile">{{ usersStats.userCount }}</span>
        <span class="flex items-center text-community">
          <ArrowUp class="mr-2" /><span>{{ usersStats.userGrowthPercent }}%</span></span
        >
      </template>
      <BaseTab name="Users" selected="true">
        <BaseChart :config="usersChartConfig" />
      </BaseTab>

      <template #Opens>
        <span class="text-brand-light-blue-gradient tg-h1-mobile">{{ opensStats.openCount }}</span>
        <span class="flex items-center text-error">
          <ArrowDown class="mr-2" /><span>{{ opensStats.openGrowthPercent }}%</span></span
        >
      </template>
      <BaseTab name="Opens">
        <BaseChart :config="opensChartConfig" />
      </BaseTab>

      <template #Clicks>
        <span class="text-brand-light-blue-gradient tg-h1-mobile">{{ clicksStats.clickCount }}</span>
        <span class="flex items-center text-community">
          <ArrowUp class="mr-2" /><span>{{ clicksStats.clickGrowthPercent }}%</span></span
        >
      </template>
      <BaseTab name="Clicks">
        <BaseChart :config="clicksChartConfig" />
      </BaseTab>
    </BaseTabs>
  </div>
</template>

<script>
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';
import BaseChart from '@/components/BaseChart.vue';
import ArrowDown from '@/assets/arrow-down-red.svg';
import ArrowUp from '@/assets/arrow-up.svg';

export default {
  name: 'StatsOverview',
  components: {
    BaseTabs,
    BaseTab,
    BaseChart,
    ArrowDown,
    ArrowUp
  },
  props: {
    usersChartConfig: {
      type: Object
    },
    opensChartConfig: {
      type: Object
    },
    clicksChartConfig: {
      type: Object
    },
    usersStats: {
      type: Object
    },
    opensStats: {
      type: Object
    },
    clicksStats: {
      type: Object
    }
  }
};
</script>

<style scoped>
.text-brand-light-blue-gradient {
  background: -webkit-linear-gradient(#0374f9, #03b3f9);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stats-overview >>> {
  .tabs .shadow-4dp {
    @apply shadow-none;
  }

  .tabs li:not(:first-child) {
    border-left: 1px solid rgba(255, 255, 255, 0.12);
  }

  .tabs li:not(.border-secondary) {
    @apply border-white border-b-1 border-opacity-12;
  }

  .tabs li a {
    @apply text-left !important;
    @apply normal-case;
  }
}
</style>
