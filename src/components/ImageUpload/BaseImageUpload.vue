<template>
  <input
    id="add-post-image-upload"
    name="PostAddImageUpload"
    accept="image/*"
    type="file"
    multiple
    @change="handleFileUpload"
  />
</template>

<script>
export default {
  name: 'BaseImageUpload',
  model: {
    prop: 'value',
    event: 'change'
  },
  methods: {
    handleFileUpload(e) {
      const allUploadedImages = [...e.target.files];
      this.$emit('change', [...allUploadedImages]);
    }
  }
};
</script>

<style scoped></style>
