<template>
  <MarkDownStyle>
    <div class="markdown-preview" v-html="content"></div>
  </MarkDownStyle>
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
