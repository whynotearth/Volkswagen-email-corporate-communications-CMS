<template>
  <div class="bg-background">
    <div class="mb-2">
      <div class="">
        <h3 class="text-black tg-body-mobile em-high">Images</h3>
      </div>
    </div>
    <div class="flex flex-wrap -mx-1">
      <ImageInput v-model="images" />
      <ImagePreview
        :selectImage="selectImage"
        v-for="(image, index) in imagesToPreview"
        :key="index"
        :image="image"
        :index="index"
      />
      <ImageModal
        v-if="selectedImageInfo.src && selectedImageInfo.index >= 0"
        @deleteImage="deleteImage"
        @resetSelectedImage="resetSelectedImage"
        :image.sync="selectedImageInfo"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      images: [],
      imagesToPreview: [],
      selectedImageInfo: {
        src: '',
        index: null
      }
    };
  },
  components: {
    ImageInput: () => import('./BaseImageUpload'),
    ImagePreview: () => import('./BaseImagePreview'),
    ImageModal: () => import('./ImagePreviewModal')
  },
  methods: {
    readImageFile(images) {
      return images.reduce((allUrls, currentImage) => {
        const reader = new FileReader();
        reader.readAsDataURL(currentImage);
        reader.onload = e => {
          allUrls.push(e.target.result);
        };
        reader.onerror = err => {
          console.log(err);
          /*
            When uploading fails, we should inform user about that.
            So notification box should pop up.
          */
        };
        return allUrls;
      }, []);
    },
    deleteImage(index) {
      this.images.splice(index, 1);
    },
    selectImage([src, index]) {
      this.selectedImageInfo.src = src;
      this.selectedImageInfo.index = index;
    },
    resetSelectedImage() {
      this.selectedImageInfo = {
        src: '',
        index: null
      };
    }
  },
  watch: {
    images(val) {
      this.$emit('change', [...val]);
      this.imagesToPreview = this.readImageFile(val);
    }
  }
};
</script>

<style scoped>
::v-deep .upload-icon--dimension,
::v-deep .upload-img--dimension {
  width: 76px;
  height: 108px;
}
</style>
