<template>
  <button class="text-white font-bold py-2 px-4 rounded-full">
    <span class="button--text"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
};
</script>

<style scoped>
button {
  font-family: Work Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  background-color: #011d51;
}

.button--text {
  color: white;
  opacity: 0.84;
}
</style>
