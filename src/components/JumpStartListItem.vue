<template>
  <div v-if="model.articles.length" class="block w-full px-2 pt-0 pb-8 bg-surface border-b-1 min-h-44">
    <h2
      class="flex tg-body-emphasis-mobile lg:tg-body-emphasis-desktop whitespace-no-wrap truncate text-left em-high py-4 pl-2"
    >
      {{ formatDate(model.date, 'EEEE, d MMM,yyyy') }}
    </h2>
    <div class="flex flex-col text-left">
      <ul class="list-none">
        <li class="flex items-center flex-row" v-for="(item, index) in model.articles" :key="index">
          <img :src="item.category.image" class="w-5 lg:w-8 h-5 lg:h-8 p-1" />
          <div
            class="tg-caption-mobile em-medium lg:tg-caption-desktop em-disabled text-black text-left truncate p-1 pl-2"
          >
            {{ item.headline }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/helpers.js';

export default {
  name: 'JumpStartItem',
  props: {
    model: {
      type: Object
    }
  },
  methods: {
    formatDate
  }
};
</script>

<style scoped>
.min-h-44 {
  min-height: 11.5rem;
}
</style>
