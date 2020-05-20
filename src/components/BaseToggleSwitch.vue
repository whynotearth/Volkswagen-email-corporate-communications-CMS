<template>
  <label for="toggle" class="flex items-center cursor-pointer">
    <div class="relative">
      <input id="toggle" type="checkbox" class="hidden" v-model="value" @click="toggleCheckbox" />
      <div class="toggle-line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
      <div class="toggle-dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
    </div>
  </label>
</template>

<script>
export default {
  name: 'BaseToggleSwitch',
  props: {
    value: {
      type: Boolean
    }
  },
  methods: {
    toggleCheckbox() {
      this.$emit('toggleSwitch');
    }
  }
};
</script>

<style scoped>
.toggle-dot {
  top: -0.25rem;
  left: -0.25rem;
  transition: all 0.3s ease-in-out;
}
.toggle-line {
  background: rgba(0, 0, 0, 0.38);
}
input:checked ~ .toggle-dot {
  transform: translateX(100%);
  background-color: #03b3f9;
}
input:checked ~ .toggle-line {
  background-color: rgb(3, 179, 249, 0.5);
}
</style>
