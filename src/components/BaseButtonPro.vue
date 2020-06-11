<template>
  <router-link
    :to="toLink"
    class="base-button flex flex-grow w-full items-strech p-5 cursor-pointer rounded-lg shadow-1dp"
  >
    <slot name="icon"></slot>
    <span class="truncate">
      <slot></slot>
    </span>
    <div class="flex-auto items-center text-right">
      <Down class="transform inline-block pointer-events-none scale-x-1 text-gray -rotate-90" />
    </div>
  </router-link>
</template>

<script>
import Down from '@/assets/down.svg';

export default {
  name: 'BaseBigButton',
  components: { Down },
  props: {
    toLink: {
      type: Object
    }
  }
};
</script>

<style scoped>
.base-button:focus {
  outline: 0;
}
</style>
