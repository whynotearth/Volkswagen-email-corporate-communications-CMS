<template>
  <div class="relative" :class="[error ? 'markdown-error' : 'markdown-grey']">
    <vue-simplemde v-model="content" :configs="configs" ref="markdownEditor" />
    <div class="flex items-center error absolute bottom-0 left-0">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import VueSimplemde from 'vue-simplemde';

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
        placeholder: "Put your article's content here.",
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
    VueSimplemde
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
@import '../styles/markdown.css';

.error {
  bottom: 8px;
  height: 18px;
}

.markdown-error,
.markdown-error >>> .CodeMirror,
.markdown-error >>> .editor-toolbar {
  --border-opacity: 1;

  border-color: #e53e3e;
  border-color: rgba(229, 62, 62, var(--border-opacity));
}

.markdown-grey,
.markdown-grey >>> .CodeMirror,
.markdown-grey >>> .editor-toolbar {
  --border-opacity: 1;

  opacity: 1;
  border-color: #718096;
  border-color: rgba(113, 128, 150, var(--border-opacity));
}

.markdown-error >>> .editor-toolbar a,
.markdown-grey >>> .editor-toolbar a {
  opacity: 0.6;
}
</style>
