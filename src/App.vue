<template>
  <div id="app" class="text-center">
    <router-view />
    <OverlayBrand
      :isVisible="overlayModel.title"
      :title="overlayModel.title"
      :message="overlayModel.message"
    ></OverlayBrand>
  </div>
</template>

<script>
import OverlayBrand from '@/components/OverlayBrand.vue';

export default {
  name: 'App',
  components: { OverlayBrand },
  computed: {
    overlayModel() {
      return this.$store.getters['overlay/model'];
    }
  }
};
</script>

<style>
html,
body {
  scroll-behavior: smooth;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
