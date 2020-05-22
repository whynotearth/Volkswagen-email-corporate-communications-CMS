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
  display: block !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

/deep/ h1 {
  font-size: 2em !important;
  margin-top: 0.67em !important;
  margin-bottom: 0.67em !important;
}

/deep/ h2 {
  font-size: 1.5em !important;
  margin-top: 0.83em !important;
  margin-bottom: 0.83em !important;
}

/deep/ h3 {
  font-size: 1.17em !important;
  margin-top: 1em !important;
  margin-bottom: 1em !important;
}

/deep/ h4 {
  font-size: 1em !important;
  margin-top: 1.33em !important;
  margin-bottom: 1.33em !important;
}

/deep/ h5 {
  font-size: 0.83em !important;
  margin-top: 1.67em !important;
  margin-bottom: 1.67em !important;
}

/deep/ h6 {
  font-size: 0.67em !important;
  margin-top: 2.33em !important;
  margin-bottom: 2.33em !important;
}

/deep/ ul,
/deep/ ol {
  @apply block mx-0 pl-10;

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
