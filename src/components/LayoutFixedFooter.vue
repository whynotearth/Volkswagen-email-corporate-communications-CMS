<template>
  <div class="page h-full flex flex-col position-relative">
    <slot name="header" />
    <div class="content-section flex-grow z-10">
      <div class="px-0 overflow-y-auto overflow-x-hidden flex flex-col h-full narrow-scrollbars pb-14">
        <transition name="fadeslow" mode="out-in">
          <slot v-if="isVisible" name="content" />
        </transition>
      </div>
      <div class="fixed bottom-0 w-full z-30"><slot name="footer" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutFixedFooter',
  data: () => ({
    isVisible: false
  }),
  mounted() {
    this.isVisible = true;
  }
};
</script>

<style scoped>
.content-section {
  max-height: calc(100% - 60px);
  @screen md {
    max-height: calc(100% - 80px);
  }
}
</style>
