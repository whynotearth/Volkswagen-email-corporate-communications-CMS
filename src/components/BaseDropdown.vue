<template>
  <div>
    <div
      @click="showDropdown = !showDropdown"
      class="flex flex-grow justify-between items-strech p-5 cursor-pointer border-b-1 border-divider"
    >
      <img
        :src="icon"
        v-if="icon"
        alt="icon"
        class="inline-block align-baseline mr-4 h-5 w-5 -mb-0.5 pointer-events-none"
      />
      <span class="truncate" :class="selectedOption ? '' : 'text-gray-500'">
        <slot name="title" :selectedOption="selectedOption">
          {{ selectedOption || placeholder }}
        </slot>
      </span>
      <div class="h-full">
        <Down
          class="transform inline-block pointer-events-none scale-x-1 text-gray"
          :class="{ 'rotate-180': showDropdown }"
        />
      </div>
    </div>
    <div
      v-if="showDropdown"
      class="dropdown absolute right-0 left-0 bg-white mt-1 mx-2 md:mx-4 py-2 rounded shadow-8dp overflow-x-hidden overflow-y-auto z-10"
    >
      <div
        class="option p-4 first:rounded-t-lg last:rounded-b-lg cursor-pointer"
        :class="{ active: selectedOption === option }"
        v-for="(option, index) in options"
        :key="index"
        @click="updateDay(option)"
      >
        <slot name="option" :option="option">{{ option }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import Down from '@/assets/down.svg';
export default {
  name: 'BaseDropdown',
  components: { Down },
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
      type: [String, Date, Number]
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
    }
  },
  data() {
    return {
      showDropdown: false
    };
  },
  methods: {
    updateDay(option) {
      this.$emit('updateSelectedOption', option);
      this.showDropdown = false;
    }
  }
};
</script>

<style scoped>
.dropdown {
  max-height: 15rem;
  top: 54px;
}
.rotate-180 {
  transform: rotate(180deg);
}
.dropdown::-webkit-scrollbar {
  width: 3px;
  padding: 2px 0;
}
.dropdown::-webkit-scrollbar-track {
  background: #ddd;
  box-shadow: none;
}
.dropdown::-webkit-scrollbar-thumb {
  background: #666;
  outline: transparent;
}
.option:hover,
.active {
  background: rgba(3, 179, 249, 0.12);
}
</style>
