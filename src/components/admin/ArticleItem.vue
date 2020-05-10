<template>
  <div v-if="model" class="block px-5 py-4 bg-surface border-b-1">
    <!-- title and date -->
    <div class="flex flex-col text-left">
      <h2 class="tg-body-emphasis-mobile text-inherit flex-grow whitespace-no-wrap overflow-x-hidden truncate" title="">
        {{ model.headline }}
      </h2>
      <div class="flex">
        <div
          class="tg-caption-mobile font-bold px-3 py-1 my-2 rounded-sm text-white"
          :style="{ backgroundColor: `#${model.category.color}` }"
        >
          {{ model.category.name }}
        </div>
      </div>
    </div>
    <!-- contents -->
    <div class="flex flex-no-wrap">
      <div class="flex-grow text-left">
        <div class="tg-caption-mobile font-bold text-black whitespace-no-wrap pb-2">
          {{ formatDate(model.date) }}
        </div>
        <div
          class="tg-caption-mobile em-disabled text-black text-left pr-2 whitespace-pre-line
          h-20 overflow-hidden"
        >
          {{ model.description }}
        </div>
      </div>
      <div v-if="model.image" class="w-20 flex-shrink-0">
        <img
          src="https://files.porsche.com/filestore/hotspotimage/multimedia/none/model-series-911-carrera-992-hotspot-image-overlay-01-mobile/normal/dc14d8b9-f233-11e8-bec8-0019999cd470;sN;twebp/porsche-normal.webp"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/helpers.js';

export default {
  name: 'ArticleItem',
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
