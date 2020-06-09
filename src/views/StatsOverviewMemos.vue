<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader :title="'Memo Overview'" :toLink="{ name: 'Stats' }" />
    </template>
    <template #content>
      <div class="bg-white flex items-center justify-center min-h-full relative flex-shrink-0 py-6">
        <div class="w-full">
          <div class="mx-auto px-12">
            <BaseChart :options="{}" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <router-link :to="{ name: 'MemoListActivity' }">link to MemoListActivity</router-link>
          </div>
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
import BaseChart from '@/components/BaseChart.vue';

export default {
  name: 'StatsOverviewMemos',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedFooter, BaseChart }
};
</script>
