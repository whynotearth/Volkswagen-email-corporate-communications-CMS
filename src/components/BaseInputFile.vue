<template>
  <div class="flex">
    <!-- attach icon -->
    <div class="flex items-center pl-2 pr-4">
      <svg width="12" height="23" viewBox="0 0 12 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.0625 5.15625L10.0625 16.6562C10.0625 18.8663 8.2725 20.6562 6.0625 20.6562C3.8525 20.6562 2.0625 18.8663 2.0625 16.6562L2.0625 4.15625C2.0625 2.77625 3.1825 1.65625 4.5625 1.65625C5.9425 1.65625 7.0625 2.77625 7.0625 4.15625V14.6562C7.0625 15.2063 6.6125 15.6562 6.0625 15.6562C5.5125 15.6562 5.0625 15.2063 5.0625 14.6562V5.15625H3.5625L3.5625 14.6562C3.5625 16.0363 4.6825 17.1562 6.0625 17.1562C7.4425 17.1562 8.5625 16.0363 8.5625 14.6562V4.15625C8.5625 1.94625 6.7725 0.15625 4.5625 0.15625C2.3525 0.15625 0.5625 1.94625 0.5625 4.15625L0.5625 16.6562C0.5625 19.6962 3.0225 22.1562 6.0625 22.1562C9.1025 22.1562 11.5625 19.6962 11.5625 16.6562L11.5625 5.15625H10.0625Z"
          fill="black"
          fill-opacity="0.54"
        />
      </svg>
    </div>

    <label class="cursor-pointer block flex-grow">
      <div class="relative">
        <div
          class="filled input appearance-none outline-none relative bg-transparent border rounded w-full px-4 py-3 focus:shadow-md active:shadow-md"
          :class="[
            error
              ? 'border-red-600 focus:border-red-600 active:border-red-600'
              : 'border-gray-600 focus:border-gray-500 active:border-gray-500'
          ]"
        >
          <span v-if="files.length === 0">{{ placeholder }}</span>
          <div v-else>
            <BaseChip v-for="(file, index) in files" :key="index" :text="file.name" />
          </div>
        </div>
        <!-- <label
          :for="idName"
          class="label bg-inherit absolute mb-0 top-0 left-0 mt-3 ml-3 cursor-text"
          :class="error ? 'text-red-600' : 'text-gray-500'"
        >
          {{ label }}
        </label> -->
        <slot></slot>
      </div>

      <input
        class="w-0 h-0 max-w-full invisible absolute"
        type="file"
        @change="$emit('change', $event)"
        accept=".csv"
      />
    </label>
  </div>
</template>

<script>
// import { randomId } from '@/helpers.js';
import BaseChip from '@/components/BaseChip.vue';

export default {
  name: 'BaseInputFile',
  components: { BaseChip },
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    placeholder: {
      type: String
    },
    error: {
      type: Boolean
    },
    // idName: {
    //   type: String,
    //   default: randomId
    // },
    files: {
      type: Array,
      default: () => []
    },
    accepts: String
  },
  methods: {}
};
</script>

<style scoped>
.input {
  transition: border 0.2s ease-in-out;
  z-index: 2;
}

/* purgecss start ignore */
@-webkit-keyframes autofill {
  0%,
  100% {
    color: inherit;
    background: transparent;
  }
}
.input:-webkit-autofill {
  -webkit-animation-delay: 1s; /* Safari support - any positive time runs instantly */
  -webkit-animation-name: autofill;
  -webkit-animation-fill-mode: both;
}
/* purgecss end ignore */

.input:focus + .label,
.input:active + .label,
.input.filled + .label {
  font-size: inherit;
  transform: translateY(-1.3rem) scale(0.75);
  transform-origin: left;
  opacity: 1;
  display: block;
  z-index: 3;
  will-change: transform;
  transition: transform 200ms ease-out, background-color 50ms ease-out 150ms;
  border-radius: 100px;
}

.input:focus::placeholder {
  color: transparent;
}

.label {
  transition: all 0.2s ease-out;
  transition: all 200ms;
  opacity: 0;
  padding: 0 5px;
  z-index: 1;
}
</style>
