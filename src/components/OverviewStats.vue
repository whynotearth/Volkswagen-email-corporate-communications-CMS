<template>
  <div class="flex flex-wrap bg-brand-gradient text-white py-4">
    <span class="tg-caption-bold-desktop text-white w-full m-4">
      <slot name="title"></slot>
    </span>
    <slot name="description"></slot>
    <BaseTabs class="w-full">
      <template #Users>
        <span class="text-brand-light-blue-gradient tg-h1-mobile">2634</span>
        <span class="">90%</span>
      </template>
      <BaseTab name="Users" selected="true">
        <template #Users>rezaa</template>
        <template #tt>faraz</template>
        chart
      </BaseTab>
      <template #Opens>Opensss</template>
      <BaseTab name="Opens">
        chart
      </BaseTab>
      <template #Clicks>Clixkss</template>
      <BaseTab name="Clicks">
        chart
      </BaseTab>
    </BaseTabs>
  </div>
</template>

<script>
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';

export default {
  name: 'OverviewStats',
  components: {
    BaseTabs,
    BaseTab
  },
  data() {
    return {
      showDropdown: false
    };
  },
  methods: {}
};
</script>

<style scoped>
.text-brand-light-blue-gradient {
  background: -webkit-linear-gradient(#0374f9, #03b3f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
