<template>
  <provider :id="id" v-slot="{ activity, pageInfo }">
    <consumer v-bind="{ activity, pageInfo, id }" />
  </provider>
</template>

<script>
import Provider from '../providers/JumpStartDetailProvider.vue';
import Consumer from '../providers/ActivityFeedDetail.vue';

export default {
  components: {
    Provider,
    Consumer
  },
  props: ['id']
};
</script>
