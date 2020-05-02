<template>
  <div>
    <ImageInput v-model="value" />
    <ImagePreview :images="value" />
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: {
    value: {
      required: true
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    ImageInput: () => import('./BaseImageUpload'),
    ImagePreview: () => import('./BaseImagePreview')
  }
};
</script>

<style scoped></style>
