<template>
  <div>
    <VueEditor
      class="editor"
      :class="error ? 'editor-error' : 'editor-grey'"
      v-model="content"
      :placeholder="placeholder"
    />
    <div class="flex items-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  name: 'BaseEditor',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    error: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    }
  },
  components: { VueEditor },
  data() {
    return {
      content: this.value
    };
  },
  methods: {
    updateValue() {
      this.$emit('change', this.content);
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
.editor-error,
.editor-error /deep/ .ql-container,
.editor-error /deep/ .ql-toolbar {
  @apply border-red-600;
}

.editor-grey,
.editor-grey /deep/ .ql-container,
.editor-grey /deep/ .ql-toolbar {
  @apply border-gray-600;
}

.editor /deep/ .ql-container {
  @apply rounded-bl rounded-br;
}

.editor /deep/ .ql-toolbar {
  @apply rounded-tl rounded-tr;
}
</style>
