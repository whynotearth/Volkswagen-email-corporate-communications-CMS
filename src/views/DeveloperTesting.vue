<template>
  <div>
    test

    <br />
    <CloudinaryWidget
      :uploaderOptions="{
        maxFiles: 1,
        maxImageWidth: 256,
        maxImageHeight: 256
      }"
    >
      <button>upload widget</button>
    </CloudinaryWidget>
  </div>
</template>

<script>
import CloudinaryWidget from '@/components/ImageUpload/CloudinaryWidget';
export default {
  name: 'DeveloperTesting',
  components: { CloudinaryWidget }
};
</script>
