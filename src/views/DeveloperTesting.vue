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

    <BaseBigButton
      class=""
      :icon="'https://res.cloudinary.com/whynotearth/image/upload/v1591633121/Volkswagen/cms/calendar_v7nvia.png'"
      @selectButton="onUpload"
    >
      View Reports
    </BaseBigButton>
  </div>
</template>

<script>
import OverviewStats from '@/components/OverviewStats';
import CloudinaryWidget from '@/components/ImageUpload/CloudinaryWidget';
import BaseBigButton from '@/components/BaseBigButton';

export default {
  name: 'DeveloperTesting',
  components: { CloudinaryWidget, OverviewStats, BaseBigButton },
  methods: {
    onUpload(result) {
      console.log(result);
    }
  }
};
</script>
