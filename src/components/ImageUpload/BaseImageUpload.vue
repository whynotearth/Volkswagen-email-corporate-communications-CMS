<template>
  <label class="bg-background m-1" for="add-post-image-upload">
    <input
      id="add-post-image-upload"
      name="upload-image"
      accept="image/png, image/jpeg"
      type="file"
      multiple
      @change="handleFileUpload"
      class="hidden"
      :key="uploadKey"
    />
    <div class="upload-icon">
      <div class="upload-icon--dimension border flex justify-center items-center">
        <PlusIcon />
      </div>
    </div>
  </label>
</template>

<script>
import PlusIcon from '@/assets/plus.svg';

export default {
  name: 'BaseImageUpload',
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      uploadKey: Math.random()
        .toString(36)
        .slice(2)
    };
  },
  components: { PlusIcon },
  methods: {
    handleFileUpload(e) {
      const allUploadedImages = [...e.target.files];
      this.uploadKey = Math.random()
        .toString(36)
        .slice(2);
      this.$emit('change', allUploadedImages.length > 0 ? [...allUploadedImages] : []);
    }
  }
};
</script>

<style scoped></style>
