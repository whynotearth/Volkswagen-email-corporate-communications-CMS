<template>
  <div>
    test

    <br />
    <CloudinaryWidget
      @uploaded="onUploaded"
      :uploaderOptions="{
        maxFiles: 1,
        clientAllowedFormats: ['pdf']
      }"
    >
      <button>upload widget</button>
    </CloudinaryWidget>

    <agile v-if="pages.length" class="container" :options="options">
      <div class="slide" v-for="item in pages" :key="item.page">
        <img :src="item.url" />
      </div>
    </agile>
  </div>
</template>

<script>
import StatsOverview from '@/components/StatsOverview';
import CloudinaryWidget from '@/components/ImageUpload/CloudinaryWidget';
import { VueAgile } from 'vue-agile';

export default {
  name: 'DeveloperTesting',
  components: { CloudinaryWidget, agile: VueAgile },
  data() {
    return {
      pages: [],
      options: {
        dots: true,
        navButtons: false
      }
    };
  },
  methods: {
    onUploaded(result) {
      this.file = result.info;
      for (let i = 1; i <= this.file.pages; i++) {
        this.pages.push({
          url: `https://res.cloudinary.com/whynotearth/image/upload/pg_${i}/${this.file.public_id}.jpg`,
          page: i
        });
      }
    }
  }
};
</script>

<style>
.agile__actions {
  margin-top: 20px;
}
.agile__dot {
  margin: 0 4px;
}
.agile__dot button {
  background-color: #011d51;
  transition-duration: 0.3s;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  width: 6px;
  height: 6px;
}
.agile__dot--current button {
  width: 12px;
  height: 12px;
}
.agile__slide * {
  height: 300px;
}
</style>
