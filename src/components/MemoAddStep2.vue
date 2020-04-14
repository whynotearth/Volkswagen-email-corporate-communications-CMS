<template>
  <div class="p-6 bg-primary h-full">
    <div class="h-full bg-surface text-left container px-0">
      <div class="h-full overflow-y-auto">
        <div class="p-4">
          <img
            class="w-8 h-8"
            src="https://res.cloudinary.com/whynotearth/image/upload/v1586844643/Volkswagen/cms/logo_tjf9ej.svg"
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
          <p>{{ get_description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'MemoAddStep2',
  computed: {
    ...mapGetters('jumpstart', ['get_to', 'get_subject', 'get_date', 'get_description', 'get_response_message'])
  }
};
</script>
