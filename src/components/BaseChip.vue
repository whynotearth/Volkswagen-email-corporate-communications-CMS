<template functional>
  <div
    class="chip rounded bg-opacity-12 bg-secondary border-1 border-divider inline-flex"
    :class="[props.isSmall ? 'px-2' : 'px-5']"
  >
    <div
      class="py-1 text-secondary uppercase tg-caption-bold-mobile"
      :class="[props.isSmall ? 'tg-caption-bold-mobile' : 'md:tg-caption-bold-desktop tg-caption-mobile em-high']"
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
