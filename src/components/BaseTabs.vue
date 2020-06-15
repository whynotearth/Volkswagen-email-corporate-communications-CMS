<template>
  <div class="tabs">
    <div class="shadow-4dp mb-2">
      <div class="container px-0 md:px-6">
        <ul class="flex tg-color-label-mobile">
          <li
            class="block flex-grow"
            v-for="(tab, index) in tabs"
            :class="{ 'is-active border-b-2 border-secondary': tab.isActive }"
            :key="index"
          >
            <a class="block p-4 text-center" :href="tab.href" @click.prevent="selectTab(tab)">
              {{ tab.name }}
              <slot :name="tab.name"></slot>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="tabs-details">
      <div class="container px-0 md:px-6">
        <slot></slot>
      </div>
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
