<template>
  <div v-if="model" class="block px-5 py-4 bg-surface border-b-1">
    <!-- title and date -->
    <div class="flex flex-col text-left">
      <h2
        class="tg-body-emphasis-mobile lg:tg-body-emphasis-desktop text-inherit flex-grow whitespace-no-wrap overflow-x-hidden truncate"
        title=""
      >
        {{ model.headline }}
      </h2>
      <div class="flex">
        <div
          class="tg-caption-mobile lg:tg-caption-desktop font-bold px-3 py-1 my-2 rounded-sm text-white"
          :style="{ backgroundColor: `#${model.category.color}` }"
        >
          {{ model.category.name }}
        </div>
      </div>
    </div>
    <!-- contents -->
    <div class="flex flex-no-wrap">
      <div class="flex-grow text-left whitespace-pre-line overflow-hidden">
        <div class="tg-caption-mobile lg:tg-caption-desktop font-bold text-black whitespace-no-wrap pb-2">
          {{ formatDate(model.date) }}
        </div>
        <div class="tg-caption-mobile em-disabled text-black text-left pr-2 h-20">
          <BaseEditorPreview :content="model.description" />
        </div>
      </div>
      <div v-if="model.image" class="w-20 lg:w-32 flex-shrink-0">
        <img :src="model.image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/helpers.js';
import BaseEditorPreview from '@/components/Editor/BaseEditorPreview.vue';

export default {
  name: 'ArticleListsItem',
  props: {
    model: {
      type: Object
    }
  },
  components: { BaseEditorPreview },
  methods: {
    formatDate
  }
};
</script>
