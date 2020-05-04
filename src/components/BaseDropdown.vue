<template>
  <div>
    <div @click="toggleDropdown()" class="flex items-strech items-center border-b-1 border-divider bg-surface">
      <div
        class="container relative md:px-6 block flex-grow justify-between flex h-full
      items-center select-none px-4 pr-6 py-5"
      >
        <span class="tg-body-mobile">
          <slot name="title" :selectedOption="selectedOption">
            {{ selectedOption || placeholder }}
          </slot>
        </span>
        <Down class="transform scale-x-1 text-gray" :class="{ 'rotate-180': showDropdown }" />
        <ul v-if="showDropdown" class="dropdown shadow-8dp mx-2 md:mx-6 z-10 py-2">
          <li
            class="text-left"
            :class="{ active: selectedOption === option }"
            v-for="(option, index) in options"
            :key="index"
            @click="selectOption(option)"
          >
            <div class="tg-body-mobile p-4 block w-full cursor-pointer">
              <slot name="option" :option="option">{{ option }}</slot>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--
      </div>

      <span class="inline-block truncate w-4/5" :class="selectedOption ? '' : 'text-gray-500'">
      </span>
    </div>
    <div v-if="showDropdown" class="dropdown mt-2 w-48 w-full rounded-lg shadow-xl overflow-x-hidden overflow-y-auto">
      <div
        class="p-5 first:rounded-t-lg last:rounded-b-lg hover:bg-secondary hover:bg-opacity-25 cursor-pointer"
        v-for="(option, index) in options"
        :key="index"
        @click="updateDay(option)"
      >
      </div>
    </div>-->
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
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      this.$emit('updateSelectedOption', option);
    }
  }
};
</script>

<style scoped>
.dropdown {
  height: 224px;
  position: absolute;
  top: 54px;
  background: white;
  border-radius: 4px;
  right: 0;
  left: 0;
  overflow-y: scroll;
}

.rotate-180 {
  transform: rotate(180deg);
}
.dropdown li:hover,
.active {
  background: rgba(3, 179, 249, 0.12);
}
</style>
