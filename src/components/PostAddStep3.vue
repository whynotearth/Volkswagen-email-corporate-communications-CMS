<template>
  <div class="flex flex-col h-full">
    <div class="flex items-strech items-center border-b-1 border-divider bg-surface" @click="toggleDropdown()">
      <div
        class="container relative md:px-6 block flex-grow justify-between flex h-full items-center select-none px-4 pr-6 py-5"
      >
        <span class="tg-body-mobile">
          Schedule
          <span class="ml-2 text-black em-medium">{{ formatDate(get_date, 'dd MMM, yyyy') }}</span>
        </span>
        <ArrowDown class="transform scale-x-1 text-gray" :class="{ 'rotate-180': isOpenDropdown }" />
        <ul v-if="isOpenDropdown" class="menu shadow-8dp mx-2 md:mx-6 z-10 py-2">
          <li
            class="text-left"
            :class="{ active: get_date === date }"
            v-for="(date, index) in dates"
            :key="index"
            @click="update_date(date)"
          >
            <div class="tg-body-mobile p-4 block w-full cursor-pointer">{{ formatDate(date, 'dd MMM, yyyy') }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-grow bg-brand-gradient overflow-y-auto narrow-scrollbars h-full">
      <div class="container relative px-0 md:px-6 text-left ">
        <div
          class="flex flex-wrap relative bg-white text-black mx-4 my-6 mt-12 p-4 bg-surface border-1"
          :style="{ borderColor: `#${get_selected_category.color}` }"
        >
          <div
            class="h-6 px-3 border-1 category-tag bg-white border-b-0 rounded rounded-bl-none
          rounded-br-none tg-caps-title-print"
            :style="{ borderColor: `#${get_selected_category.color}`, color: `#${get_selected_category.color}` }"
          >
            {{ get_selected_category.name }}
          </div>
          <div class="flex items-center justify-center w-8 h-8 rounded-full bg-white circle-icon">
            <img class="m-auto w-4 h-4" :src="get_selected_category.image" />
          </div>
          <!-- <img class="m-auto w-16" :src="get_selected_category.image" /> -->
          <div class="w-full tg-h2-mobile text-black py-3">
            {{ get_headline }}
          </div>
          <div class="w-full tg-body-mobile text-black em-high whitespace-pre-line break-words">
            {{ get_description }}
          </div>
        </div>
        <p v-if="get_response_message.message" class="font-bold px-4 mb-4" :class="get_response_message.class">
          {{ get_response_message.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowDown from '@/assets/arrow-down.svg';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { formatDate } from '@/helpers.js';

export default {
  name: 'PostAddStep3',
  components: { ArrowDown },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpenDropdown: false
    };
  },
  mounted() {
    this.update_date(this.dates[0]);
  },
  methods: {
    ...mapMutations('post', ['update_date']),
    formatDate,
    toggleDropdown() {
      this.isOpenDropdown = !this.isOpenDropdown;
    }
  },
  computed: {
    ...mapGetters('post', [
      'get_date',
      'get_response_message',
      'get_selected_category',
      'get_headline',
      'get_description'
    ]),
    dates() {
      let d = new Date();
      d.setHours(0, 0, 0, 0);
      d = d.getTime();
      let days = [];
      for (let i = 0; i < 30; i++) {
        let a = d + i * 86400000;
        days.push(new Date(a));
      }
      return days;
    }
  }
};
</script>

<style scoped>
.menu {
  height: 224px;
  position: absolute;
  top: 54px;
  background: white;
  border-radius: 4px;
  right: 0;
  left: 0;
  overflow-y: scroll;
}
.active {
  background: rgba(3, 179, 249, 0.12);
}
.circle-icon {
  position: absolute;
  top: -16px;
  right: 16px;
}

.category-tag {
  min-width: 130px;
  position: absolute;
  top: -24px;
  left: 24px;
}
.rotate-180 {
  transform: rotate(180deg);
}
</style>
