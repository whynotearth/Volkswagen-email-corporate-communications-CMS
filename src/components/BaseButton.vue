<template>
  <button class="bg-primary em-high text-white text-sm font-medium leading-6 uppercase py-2 px-4 rounded-full">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
};
</script>

<style scoped>
button {
  letter-spacing: 0.02;
}
</style>
