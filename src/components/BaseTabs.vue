<template>
  <div>
    <div class="tabs mb-2">
      <ul class="flex justify-start shadow-4dp tg-color-label-mobile">
        <li
          class="block flex-grow"
          v-for="(tab, index) in tabs"
          :class="{ 'is-active border-b-2 border-secondary': tab.isActive }"
          :key="index"
        >
          <a class="block p-4" :href="tab.href" @click.prevent="selectTab(tab)">{{ tab.name }}</a>
        </li>
      </ul>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTabs',
  data: () => ({ tabs: [] }),
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name == selectedTab.name;
      });
    }
  }
};
</script>
