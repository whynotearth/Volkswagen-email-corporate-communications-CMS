<template>
  <div class="relative" :class="[error ? 'markdown-error' : 'markdown-grey']">
    <MarkDownStyle>
      <vue-simplemde v-model="content" :configs="configs" ref="markdownEditor" />
    </MarkDownStyle>
    <div class="flex items-center error absolute bottom-0 left-0">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import VueSimplemde from 'vue-simplemde';
import MarkDownStyle from './BaseMarkDownStyleProvider.vue';

export default {
  name: 'MarkDownEditor',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      content: null,
      configs: {
        status: ['lines', 'words'],
        spellChecker: false,
        placeholder: "Put your article's content here",
        hideIcons: ['code', 'table', 'side-by-side', 'fullscreen', 'image']
      }
    };
  },
  computed: {
    simplemde() {
      return this.$refs.markdownEditor.simplemde;
    }
  },
  components: {
    VueSimplemde,
    MarkDownStyle
  },
  methods: {
    updateValue() {
      this.$emit('change', this.simplemde.markdown(this.content));
    }
  },
  watch: {
    content() {
      this.updateValue();
    }
  }
};
</script>

<style scoped>
@import '~simplemde/dist/simplemde.min.css';

.error {
  bottom: 8px;
  height: 18px;
}

.markdown-error,
.markdown-error /deep/ .CodeMirror,
.markdown-error /deep/ .editor-toolbar {
  @apply border-red-600;
}

.markdown-grey,
.markdown-grey /deep/ .CodeMirror,
.markdown-grey /deep/ .editor-toolbar {
  @apply opacity-100;
  @apply border-gray-600;
}

.markdown-error /deep/ .editor-toolbar a {
  @apply opacity-75;
}

.markdown-grey /deep/ .editor-toolbar a {
  @apply opacity-50;
}
</style>
