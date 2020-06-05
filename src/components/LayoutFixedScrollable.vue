<template>
  <div class="page h-full flex flex-col position-relative">
    <slot name="header" />
    <div class="flex-grow z-2">
      <div class="px-0 overflow-y-auto overflow-x-hidden flex flex-col h-full narrow-scrollbars">
        <transition name="fadeslow" mode="out-in">
          <slot v-if="isVisible" name="content" />
        </transition>
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
import { sleep } from '@/helpers.js';
export default {
  name: 'LayoutFixedScrollable',
  data: () => ({
    isVisible: false
  }),
  mounted() {
    this.isVisible = true;
  }
};
</script>
