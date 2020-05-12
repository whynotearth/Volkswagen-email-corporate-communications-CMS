<template>
  <mark-down-style>
    <div class="markdown-preview" v-html="content"></div>
  </mark-down-style>
</template>

<script>
import MarkDownStyle from './BaseMarkDownStyleProvider.vue';

export default {
  name: 'MarkDownPreview',
  props: {
    content: {
      required: true
    }
  },
  components: {
    MarkDownStyle
  }
};
</script>
