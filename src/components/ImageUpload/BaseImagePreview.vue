<template>
  <div>
    <img :src="image" v-for="(image, index) in imagePreviews" :key="index" />
  </div>
</template>

<script>
export default {
  name: 'BaseImagePreview',
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      imagePreviews: []
    };
  },
  methods: {
    readImageFile() {
      this.imagePreviews = this.images.map(image => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
          this.imagePreviews.push(e.target.result);
          console.log(e.target.result);
        };
        reader.onerror = err => {
          console.log(err);
          /*
            When uploading fails, we should inform user about that.
            So notification box should pop up.
          */
        };
      });
    }
  }
};
</script>

<style></style>
