<template>
  <div class="tabs">
    <div class="shadow-4dp mb-2">
      <div :class="tabsContainerClasses">
        <ul class="flex tg-color-label-mobile">
          <li
            class="block flex-shrink-0"
            v-for="(tab, index) in tabs"
            :class="[{ 'is-active border-b-2 border-secondary': tab.isActive }, `w-1/${tabs.length}`]"
            :key="index"
          >
            <a class="block" :class="tabLinkClasses" href="#" @click.prevent="selectTab(tab)">
              <slot :isActive="tab.isActive" :name="tab.name">{{ tab.name }}</slot>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="tabs-details">
      <div class="container px-0 md:px-6">
        <slot />
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
  props: {
    tabsContainerClasses: {
      type: String,
      default: 'container px-0 md:px-6'
    },
    tabLinkClasses: {
      type: String,
      default: 'p-4 text-center'
    }
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
