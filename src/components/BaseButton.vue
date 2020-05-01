<template>
  <button class="bg-primary text-white text-sm font-bold leading-6 tracking-wide uppercase py-2 px-4 rounded-full">
    <span class="button--text em-high"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
};
</script>

<style scoped></style>
