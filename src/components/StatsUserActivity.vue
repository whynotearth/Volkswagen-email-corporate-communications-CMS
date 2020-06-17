<template>
  <div class="px-3 bg-surface">
    <div class="custom-title text-black em-high text-left">{{ title }}</div>
    <div v-for="(item, index) in list" :key="index" class="flex w-full justify-between text-black em-high py-2">
      <span class="tg-body-mobile">{{ item.name }}</span>
      <span class="tg-body-emphasis-mobile">{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsUserActivity',
  props: {
    list: {
      type: Object,
      default: () => {}
    },
    title: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style scoped>
.custom-title {
  font-family: 'VWHead-Bold', sans-serif;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
}
</style>
