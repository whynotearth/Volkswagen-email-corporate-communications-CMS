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

    <BaseButtonPro class="" @selectButton="onUpload">
      <template #icon>
        <Calendar class="inline-block align-baseline mr-4 h-5 w-5 -mb-0.5 pointer-events-none" />
      </template>
      View Reports
    </BaseButtonPro>
  </div>
</template>

<script>
import OverviewStats from '@/components/OverviewStats';
import CloudinaryWidget from '@/components/ImageUpload/CloudinaryWidget';
import BaseButtonPro from '@/components/BaseButtonPro';
import Calendar from '@/assets/calendar.svg';

export default {
  name: 'DeveloperTesting',
  components: { CloudinaryWidget, OverviewStats, BaseButtonPro, Calendar },
  methods: {
    onUpload(result) {
      console.log(result);
    }
  }
};
</script>
