<template>
  <div class="px-3 bg-surface">
    <div class="custom-title text-black em-high text-left">{{ title }}</div>
    <div class="flex w-full justify-between text-black em-high py-2">
      <span class="tg-body-mobile">Successful deliveries</span>
      <span class="tg-body-emphasis-mobile">{{ fields.deliverPercent }}%</span>
    </div>
    <div class="flex w-full justify-between text-black em-high py-2">
      <span class="tg-body-mobile">Last opened</span>
      <span class="tg-body-emphasis-mobile">{{ lastOpenDateTime }}</span>
    </div>
    <div class="flex w-full justify-between text-black em-high py-2">
      <span class="tg-body-mobile">Total clicks</span>
      <span class="tg-body-emphasis-mobile">{{ fields.clickCount || '-' }}</span>
    </div>
    <div class="flex w-full justify-between text-black em-high py-2">
      <span class="tg-body-mobile">Last clicked</span>
      <span class="tg-body-emphasis-mobile">{{ lastClickDateTime }}</span>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/helpers';

export default {
  name: 'StatsUserActivity',
  props: {
    fields: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    lastOpenDateTime() {
      return this.fields.lastOpenDateTime ? formatDate(this.fields.lastOpenDateTime, 'dd MMM yyyy, h:mm aaa') : '-';
    },
    lastClickDateTime() {
      return this.fields.lastClickDateTime ? formatDate(this.fields.lastClickDateTime, 'dd MMM yyyy, h:mm aaa') : '-';
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
