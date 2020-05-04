<template>
  <div>
    <div @click="showDropdown = !showDropdown" class="w-full p-5 mb-2 cursor-pointer">
      <img
        :src="icon"
        v-if="icon"
        alt="icon"
        class="inline-block align-baseline mr-4 h-5 w-5 -mb-0.5 pointer-events-none"
      />
      <span class="inline-block truncate w-4/5" :class="selectedOption ? '' : 'text-gray-500'">
        <slot name="title" :selectedOption="selectedOption">
          {{ selectedOption || placeholder }}
        </slot>
      </span>
      <div class="h-full float-right ">
        <Down class="inline-block pointer-events-none" />
      </div>
    </div>
    <div v-if="showDropdown" class="dropdown mt-2 w-48 w-full rounded-lg shadow-xl overflow-x-hidden overflow-y-auto">
      <div
        class="p-5 first:rounded-t-lg last:rounded-b-lg hover:bg-secondary hover:bg-opacity-25 cursor-pointer"
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
  max-height: 13rem;
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
</style>
