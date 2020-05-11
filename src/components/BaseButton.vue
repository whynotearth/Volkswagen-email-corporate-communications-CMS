<template functional>
  <button
    v-on="listeners"
    :class="[props.bgType ? `bg-${props.bgType}` : 'bg-primary', props.classes ? props.classes : '']"
    class="em-high text-white text-sm font-medium leading-6 uppercase py-2 px-4 rounded-full"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  letter-spacing: 0.02;
}
</style>
