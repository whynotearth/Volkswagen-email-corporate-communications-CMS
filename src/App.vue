<template>
  <div id="app" class="text-center">
    <transition name="fade" mode="out-in">
      <router-view @hook:mounted="hideWelcomeMessage" />
    </transition>
    <transition name="fade">
      <div v-if="overlayModel.title || overlayModel.message" class="w-full h-full fixed block top-0 left-0 z-50">
        <OverlayBrand :title="overlayModel.title" :message="overlayModel.message"></OverlayBrand>
      </div>
    </transition>
  </div>
</template>

<script>
import OverlayBrand from '@/components/OverlayBrand.vue';
// import vhFix from '@/mixins/vh-fix';

export default {
  name: 'App',
  components: { OverlayBrand },
  // mixins: [vhFix],
  computed: {
    overlayModel() {
      return this.$store.getters['overlay/model'];
    }
  },
  created() {
    this.$store.commit('overlay/updateModel', {
      title: 'Welcome!'
    });
  },
  methods: {
    hideWelcomeMessage() {
      setTimeout(() => {
        this.$store.commit('overlay/updateModel', {
          title: ''
        });
      }, 1500);
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
