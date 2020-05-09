<template>
  <div id="upload_widget">
    <slot />
  </div>
</template>

<script>
const scriptUrl = 'https://widget.cloudinary.com/v2.0/global/all.js';
const scriptId = 'cloudinary-widget-script';
export default {
  name: 'CloudinaryWidget',
  props: {
    uploaderOptions: {
      default: () => {}
    }
  },
  mounted() {
    this.loadWidgetScript();
  },
  methods: {
    loadWidgetScript() {
      const isScriptExist = document.getElementById(scriptId);
      if (isScriptExist) {
        this.init();
        return;
      }
      let theScript = document.createElement('script');
      theScript.setAttribute('src', scriptUrl);
      theScript.async = true;
      theScript.id = scriptId;
      theScript.onload = () => {
        this.init();
      };
      document.head.appendChild(theScript);
    },
    init() {
      // available options https://cloudinary.com/documentation/upload_widget#unsigned_uploads
      var myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'whynotearth',
          uploadPreset: 'vw-cms-contents',
          theme: 'minimal',
          ...this.uploaderOptions
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            this.$emit('uploaded', result);
          }
          if (error) {
            this.$emit('error', error);
          }
        }
      );

      document.getElementById('upload_widget').addEventListener(
        'click',
        function() {
          myWidget.open();
        },
        false
      );
    }
  }
};
</script>
