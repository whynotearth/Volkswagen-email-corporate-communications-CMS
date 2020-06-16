<template>
  <div class="mb-4 relative text-black text-opacity-84" v-click-outside="hideDropdown">
    <div
      @click="toggleDropdown"
      class="w-full mb-2 rounded shadow-1dp cursor-pointer flex items-center"
      :class="[background, tight ? 'py-3 px-4 rounded' : 'p-5 rounded-lg']"
    >
      <div class="mr-4 h-5 w-5 pointer-events-none" v-if="$slots.icon">
        <slot name="icon" />
      </div>
      <span class="inline-block flex-grow truncate text-black text-opacity-84">
        <slot name="title" :selectedOption="selectedOption">
          {{ selectedOption || placeholder }}
        </slot>
      </span>
      <IconDown
        class="float-right pointer-events-none text-black flex-shrink-0 w-4 ml-4"
        :class="{ 'transform rotate-180': dropdown }"
      />
    </div>
    <div
      v-if="dropdown"
      class="dropdown absolute right-0 left-0 z-60 narrow-scrollbars w-48 w-full shadow-8dp overflow-x-hidden overflow-y-auto"
      :class="[background, tight ? 'rounded' : 'rounded-lg']"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        @click="updateValue(option)"
        class="hover:bg-footer cursor-pointer"
        :class="tight ? 'p-4 first:rounded-t last:rounded-b' : 'p-5 first:rounded-t-lg last:rounded-b-lg'"
      >
        <slot name="option" :option="option">{{ option }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import IconDown from '@/assets/down.svg';

export default {
  name: 'Dropdown',
  components: { IconDown },
  model: {
    prop: 'selectedOption',
    event: 'updateSelectedOption'
  },
  props: {
    icon: {
      type: String,
      default: null
    },
    selectedOption: {
      type: [String, Date, Number, Object]
    },
    options: {
      type: Array,
      default: () => {
        return ['Option 1', 'Option 2', 'Option 2'];
      }
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    background: {
      type: String,
      default: 'bg-surface'
    },
    tight: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropdown: false
    };
  },
  methods: {
    hideDropdown() {
      this.dropdown = false;
    },
    showDropdown() {
      this.dropdown = true;
    },
    toggleDropdown() {
      if (this.dropdown) {
        this.hideDropdown();
      } else {
        this.showDropdown();
      }
    },
    updateValue(option) {
      this.$emit('updateSelectedOption', option);
      this.hideDropdown();
    }
  }
};
</script>

<style scoped>
.dropdown {
  max-height: 13rem;
}
</style>
