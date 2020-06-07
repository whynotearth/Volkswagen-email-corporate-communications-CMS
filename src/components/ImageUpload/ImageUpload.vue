<template>
  <div class="bg-background">
    <div class="mb-2">
      <div class="">
        <h3 class="text-black tg-body-mobile em-high">Images</h3>
      </div>
    </div>
    <div class="flex flex-wrap -mx-1">
      <CloudinaryWidget
        @uploaded="onUpload"
        @opened="onUploaderOpened"
        :uploaderOptions="{
          maxFiles: 1,
          maxImageWidth: 560,
          clientAllowedFormats: ['jpg', 'png']
        }"
      >
        <label class="bg-background m-1 block cursor-pointer" for="add-post-image-upload">
          <div class="upload-icon">
            <div class="upload-icon--dimension border flex justify-center items-center">
              <PlusIcon />
            </div>
          </div>
        </label>
      </CloudinaryWidget>
      <div class="upload-previews-wrapper flex flex-wrap">
        <template v-for="(image, index) in imagesToPreview">
          <BaseImagePreview
            :selectImage="selectImage"
            v-if="image && image.url"
            :key="index"
            :image="image.url"
            :index="index"
          />
        </template>
      </div>
      <ImagePreviewModal
        v-if="selectedImageInfo && selectedImageInfo.url && selectedImageInfo.index >= 0"
        @deleteImage="deleteImage"
        @resetSelectedImage="resetSelectedImage"
        :image.sync="selectedImageInfo"
      />
    </div>
  </div>
</template>

<script>
import PlusIcon from '@/assets/plus.svg';

export default {
  name: 'ImageUpload',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    defaultImages: {
      type: Array
    },
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      images: [],
      imagesToPreview: [],
      selectedImageInfo: {
        url: '',
        index: null
      }
    };
  },
  components: {
    PlusIcon,
    BaseImagePreview: () => import('./BaseImagePreview'),
    ImagePreviewModal: () => import('./ImagePreviewModal'),
    CloudinaryWidget: () => import('./CloudinaryWidget')
  },
  mounted() {
    this.images = [...this.defaultImages];
    this.imagesToPreview = [...this.defaultImages];
  },
  methods: {
    deleteImage(index) {
      this.images.splice(index, 1);
      this.$emit('change', [...this.images]);
    },
    selectImage([url, index]) {
      this.selectedImageInfo.url = url;
      this.selectedImageInfo.index = index;
    },
    resetSelectedImage() {
      this.selectedImageInfo = {
        url: '',
        index: null
      };
    },
    onUploaderOpened() {
      //
    },
    onUpload(result) {
      if (result.event === 'success') {
        const images = [this.getCloudinaryImageAdaptedObject(result.info)];
        this.images = images;
        this.$emit('change', [...this.images]);
      }
    },
    getCloudinaryImageAdaptedObject(cloudinaryImageInfo) {
      const { url, height, width } = cloudinaryImageInfo;
      return {
        url,
        height,
        width
      };
    }
  },
  watch: {
    value(val) {
      this.imagesToPreview = [...val];
    }
  }
};
</script>

<style scoped>
.upload-icon--dimension,
.upload-img--dimension {
  width: 76px;
  height: 108px;
}
.upload-previews-wrapper {
  height: 108px;
}
</style>
