<template functional>
  <div class="markdown">
    <slot></slot>
  </div>
</template>

<style scoped>
/deep/ h1,
/deep/ h2,
/deep/ h3,
/deep/ h4,
/deep/ h5,
/deep/ h6 {
  font-weight: bolder !important;
}

/deep/ h1 {
  font-size: 2em !important;
}

/deep/ h2 {
  font-size: 1.5em !important;
}

/deep/ h3 {
  font-size: 1.17em !important;
}

/deep/ h4 {
  font-size: 1em !important;
}

/deep/ h5 {
  font-size: 0.83em !important;
}

/deep/ h6 {
  font-size: 0.67em !important;
}

/deep/ ul,
/deep/ ol {
  @apply block mx-0 p-10;

  margin-top: 1em !important;
  margin-bottom: 1em !important;
}

/deep/ ol {
  @apply list-decimal;
}

/deep/ ul {
  @apply list-disc;
}

/deep/ li {
  display: list-item !important;
}
</style>
