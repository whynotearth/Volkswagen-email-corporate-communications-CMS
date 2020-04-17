<template>
  <div class="mb-4 relative">
    <input
      class="input appearance-none outline-none relative bg-transparent border rounded w-full px-4 py-3 focus:shadow-md active:shadow-md"
      :class="[
        { filled: value.length > 0 },
        error
          ? 'border-red-600 focus:border-red-600 active:border-red-600'
          : 'border-gray-600 focus:border-gray-500 active:border-gray-500'
      ]"
      id="text_input"
      :type="type"
      :value="value"
      @blur="$emit('input', $event.target.value)"
      :placeholder="placeholder || label"
    />
    <label
      for="text_input"
      class="label bg-inherit absolute mb-0 top-0 left-0 mt-3 ml-3 cursor-text"
      :class="error ? 'text-red-600' : 'text-gray-500'"
    >
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Label'
    },
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    error: {
      default: Boolean
    }
  },
  data() {
    return {
      labelClicked: false
    };
  }
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
