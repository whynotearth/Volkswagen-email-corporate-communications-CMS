<template>
  <div>
    <CloudinaryWidget
      @uploaded="onUploaded"
      :uploaderOptions="{
        maxFiles: 1,
        clientAllowedFormats: ['pdf']
      }"
    >
      <button class="border m-3 p-3">Upload PDF</button>
    </CloudinaryWidget>

    <BaseCarouselIndicator v-if="pages.length" :items="pages" :settings="settingsCarousel" />
  </div>
</template>

<script>
import CloudinaryWidget from '@/components/ImageUpload/CloudinaryWidget';
import BaseCarouselIndicator from '@/components/BaseCarouselIndicator';

export default {
  name: 'DeveloperTesting',
  props: {
    settingsCarousel: {
      type: Object,
      default: () => {}
    }
  },
  components: { CloudinaryWidget, BaseCarouselIndicator },
  data() {
    return {
      pages: []
    };
  },
  methods: {
    onUploaded(result) {
      this.file = result.info;
      this.pages = [];
      for (let i = 1; i <= this.file.pages; i++) {
        this.pages.push(`https://res.cloudinary.com/whynotearth/image/upload/pg_${i}/${this.file.public_id}.jpg`);
      }
      this.$emit('change', this.file);
    }
  }
};
</script>
