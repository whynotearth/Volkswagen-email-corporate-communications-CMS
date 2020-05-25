<template functional>
  <div class="chip rounded bg-opacity-12 bg-secondary border-1 border-divider inline-flex px-5">
    <div
      class="py-1 text-secondary uppercase md:tg-caption-bold-desktop tg-caption-mobile em-high tg-caption-bold-mobile"
    >
      {{ props.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseChip'
};
</script>

<style scoped>
.bg-opacity-12 {
  --bg-opacity: 0.12;
}
</style>
