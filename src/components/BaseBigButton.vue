<template>
  <button
    :type="type"
    @click="select()"
    class="flex flex-grow w-full items-strech p-5 cursor-pointer rounded-lg shadow"
  >
    <img
      :src="icon"
      v-if="icon"
      alt="icon"
      class="inline-block align-baseline mr-4 h-5 w-5 -mb-0.5 pointer-events-none"
    />
    <span class="truncate">
      <slot></slot>
    </span>
    <div class="flex-auto items-center text-right">
      <Down class="transform inline-block pointer-events-none scale-x-1 text-gray rotate-270" />
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
    icon: {
      type: String,
      default: null
    },
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
.rotate-270 {
  transform: rotate(270deg);
}
</style>
