<template>
  <div>
    test

    <br />
    <CloudinaryWidget
      @uploaded="onUpload"
      :uploaderOptions="{
        maxFiles: 1,
        maxImageWidth: 256,
        maxImageHeight: 256
      }"
    >
      <button>upload widget</button>
    </CloudinaryWidget>
    <OverviewStats>
      <template #title>Memo Overview</template>
    </OverviewStats>
  </div>
</template>

<script>
import OverviewStats from '@/components/OverviewStats';
import CloudinaryWidget from '@/components/ImageUpload/CloudinaryWidget';
export default {
  name: 'DeveloperTesting',
  components: { CloudinaryWidget, OverviewStats },
  methods: {
    onUpload(result) {
      console.log(result);
    }
  }
};
</script>
