<template>
  <provider v-slot="{ list, pageInfo }">
    <consumer v-bind="{ list, pageInfo }" />
  </provider>
</template>

<script>
import Provider from '../providers/MemoList.vue';
import Consumer from '../providers/ActivityList.vue';

export default {
  name: 'MemoListActivity',
  components: {
    Provider,
    Consumer
  }
};
</script>
