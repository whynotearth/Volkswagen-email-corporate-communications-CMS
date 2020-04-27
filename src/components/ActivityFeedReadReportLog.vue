<template functional>
  <div>
    <div class="tg-body-mobile em-high mb-2">To: {{ props.email }}</div>
    <div class="tg-caption-mobile em-disabled">
      <span v-if="props.deliverDateTime">Recieved: {{ props.deliverDateTime }}</span>
      <span v-else>Not recieved</span>
    </div>

    <div v-if="!props.hideOpened && props.deliverDateTime" class="tg-caption-mobile em-disabled">
      Opened: {{ props.openDateTime }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityFeedReadReportLog',
  props: ['email', 'deliverDateTime', 'openDateTime', 'hideOpened']
};
</script>
