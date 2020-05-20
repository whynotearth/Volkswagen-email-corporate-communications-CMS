<template functional>
  <div class="ql-container ql-snow">
    <div class="ql-editor" v-html="props.content"></div>
  </div>
</template>

<style scoped>
@import '~vue2-editor/dist/vue2-editor.css';

.ql-container.ql-snow {
  @apply border-0;
}

.ql-editor {
  @apply p-0 min-h-0;
}
</style>
