<template>
  <div>
    <div class="tg-body-mobile em-high mb-2">To: {{ model.to }}</div>
    <div class="tg-caption-mobile em-disabled">Recieved: {{ model.recieved }}</div>
    <div class="tg-caption-mobile em-disabled">Opened: {{ model.opened }}</div>
  </div>
</template>

<script>
export default {
  name: 'ActivityFeedReadReportLog',
  props: ['model']
};
</script>
