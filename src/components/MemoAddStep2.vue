<template>
  <div class="py-6 bg-brand-gradient h-full">
    <div class="h-full text-left container px-4 md:px-6">
      <div class="h-full bg-surface">
        <div class="h-full overflow-y-auto">
          <div class="p-4 flex items-center">
            <img
              class="h-8 md:h-16 mr-2"
              src="https://res.cloudinary.com/die9ji2vn/image/upload/v1603095054/vk-new-logo_ik4ew5.png"
              alt=""
            />
          </div>
          <hr />
          <template v-if="get_response_message.message">
            <p :class="get_response_message.class" class="p-4 font-bold">{{ get_response_message.message }}</p>
            <hr />
          </template>
          <div class="p-4 body-1-mobile">
            <p class="mb-2"><b>Date:</b> {{ get_date }}</p>
            <p class="mb-2"><b>To:</b> {{ get_to }}</p>
            <p class="mb-2">{{ get_subject }}</p>
            <div class="w-full tg-body-mobile text-black em-high whitespace-pre-line break-words flex-grow order-2">
              <BaseEditorPreview :content="get_description" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseEditorPreview from '@/components/Editor/BaseEditorPreview.vue';

export default {
  name: 'MemoAddStep2',
  components: { BaseEditorPreview },
  computed: {
    ...mapGetters('memo', ['get_to', 'get_subject', 'get_date', 'get_description', 'get_response_message'])
  }
};
</script>
