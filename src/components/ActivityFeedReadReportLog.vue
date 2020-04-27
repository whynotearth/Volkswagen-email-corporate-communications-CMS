<template functional>
  <div>
    <div class="tg-body-mobile em-high mb-2">To: {{ props.email }}</div>
    <div class="tg-caption-mobile em-disabled">Recieved: {{ props.deliverDateTime }}</div>
    <div v-if="openDateTime" class="tg-caption-mobile em-disabled">Opened: {{ props.openDateTime }}</div>
  </div>
</template>

<script>
export default {
  name: 'ActivityFeedReadReportLog',
  props: ['email', 'deliverDateTime', 'openDateTime']
};
</script>
