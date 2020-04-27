<template functional>
  <div>
    <div class="tg-body-mobile em-high mb-2">To: {{ props.email }}</div>
    <div :class="{ 'text-error': !props.deliverDateTime }" class="tg-caption-mobile">
      <span v-if="props.deliverDateTime" class="em-disabled">Recieved: {{ props.deliverDateTime }}</span>
      <span v-else class="text-error em-high">Not recieved</span>
    </div>

    <div
      v-if="!props.hideOpened && props.deliverDateTime"
      :class="{ 'text-error': !props.openDateTime }"
      class="tg-caption-mobile em-disabled"
    >
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
