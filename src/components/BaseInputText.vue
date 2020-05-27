<template>
  <div
    class="base-input-text relative rounded"
    :class="[{ 'is-focused': isFocused, 'is-filled': value.length > 0, 'has-icon-before': $slots.iconBefore }]"
  >
    <div
      class="flex rounded"
      :class="[
        hasBorder ? 'border' : '',
        error
          ? 'border-red-600 focus:border-red-600 active:border-red-600'
          : 'border-gray-600 focus:border-gray-500 active:border-gray-500'
      ]"
    >
      <div v-if="$slots.iconBefore" class="flex items-center pl-4">
        <slot name="iconBefore" />
      </div>
      <div class="flex-grow">
        <input
          class="input appearance-none outline-none relative bg-transparent w-full px-4 py-3 border-none"
          :id="idName"
          :type="type"
          :value="value"
          v-on="inputListeners"
          :placeholder="placeholder || label"
        />
      </div>
    </div>

    <div>
      <div class="flex justify-between">
        <div><slot></slot></div>
        <div
          v-if="model"
          class="text-xs"
          :class="[value.length > model.$params.maxLength.max ? 'text-error' : 'text-gray-500']"
        >
          {{ value.length }} / {{ model.$params.maxLength.max }}
        </div>
      </div>
    </div>

    <label
      v-show="!$slots.iconBefore"
      :for="idName"
      class="bg-inherit label absolute top-0 left-0 cursor-text"
      :class="error ? 'text-red-600' : 'text-gray-500'"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
import { randomId } from '@/helpers.js';

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
      type: Boolean
    },
    idName: {
      type: String,
      default: randomId
    },
    hasBorder: {
      type: Boolean,
      default: true
    },
    model: {
      type: Object
    }
  },
  data() {
    return {
      isFocused: false,
      labelClicked: false
    };
  },
  computed: {
    inputListeners: function() {
      var vm = this;
      return Object.assign({}, this.$listeners, {
        blur: this.onBlur,
        focus: this.onFocus,
        input: this.onInput
      });
    }
  },
  methods: {
    onBlur($event) {
      this.isFocused = false;
      this.$emit('input', $event.target.value);
    },
    onFocus($event) {
      this.isFocused = true;
    },
    onInput($event) {
      this.$emit('input', $event.target.value);
    }
  }
};
</script>

<style scoped>
.label {
  transition: all 200ms ease-out;
  opacity: 0;
  z-index: 1;
}

.input {
  z-index: 2;
  &:focus::placeholder {
    color: transparent;
  }
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

.base-input-text {
  .label {
    transform: translateY(50%) translateX(1rem) scale(1);
  }

  &.has-icon-before {
    .label {
      transform: translateY(50%) translateX(3rem) scale(1);
    }
  }

  &.is-focused,
  &.is-filled {
    .label {
      padding: 0 6px;
      font-size: inherit;
      transform: translateY(-50%) translateX(0.75rem) scale(0.75);
      transform-origin: left;
      opacity: 1;
      display: block;
      z-index: 3;
      will-change: transform, background-color;
      transition: transform 200ms ease-out, background-color 50ms ease-out 150ms, padding 0 linear 200ms,
        opacity 200ms ease-out;
      border-radius: 100px;
    }

    &.has-icon-before {
      .label {
        transform: translateY(-50%) translateX(3rem) scale(0.75);
      }
    }
  }
}
</style>
