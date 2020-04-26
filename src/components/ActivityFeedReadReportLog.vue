<template>
  <div>
    <div class="tg-body-mobile em-high mb-2">To: {{ model.email }}</div>
    <div class="tg-caption-mobile em-disabled">Recieved: {{ model.deliverDateTime }}</div>
    <div v-if="model.openDateTime" class="tg-caption-mobile em-disabled">Opened: {{ model.openDateTime }}</div>
  </div>
</template>

<script>
export default {
  name: 'ActivityFeedReadReportLog',
  props: ['model']
};
</script>
