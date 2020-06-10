<template>
  <button
    :type="type"
    @click="select()"
    class="flex flex-grow w-full items-strech p-5 cursor-pointer rounded-lg shadow"
  >
    <slot name="icon"></slot>
    <span class="truncate">
      <slot></slot>
    </span>
    <div class="flex-auto items-center text-right">
      <Down class="transform inline-block pointer-events-none scale-x-1 text-gray -rotate-90" />
    </div>
  </button>
</template>

<script>
import Down from '@/assets/down.svg';

export default {
  name: 'BaseBigButton',
  components: { Down },
  methods: {
    select() {
      this.$emit('selectButton');
    }
  },
  props: {
    type: {
      type: String,
      default: 'button'
    }
  }
};
</script>

<style scoped>
button {
  letter-spacing: 0.02;
}
button:focus {
  outline: 0;
}
button:hover {
  background: rgba(3, 179, 249, 0.4);
}
</style>
