<template>
  <provider v-slot="{ list, pageInfo }">
    <consumer v-bind="{ list, pageInfo }" />
  </provider>
</template>

<script>
import Provider from '../providers/JumpStartProvider.vue';
import Consumer from '../providers/ActivityList.vue';

export default {
  components: {
    Provider,
    Consumer
  }
};
</script>
