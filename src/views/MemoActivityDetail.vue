<template>
  <provider :id="id" v-slot="{ activity, pageInfo }">
    <consumer v-bind="{ activity, pageInfo, id }" />
  </provider>
</template>

<script>
import Provider from '../providers/MemoDetail.vue';
import Consumer from '../providers/ActivityDetail.vue';

export default {
  name: 'MemoActivityDetail',
  components: {
    Provider,
    Consumer
  },
  props: ['id']
};
</script>
