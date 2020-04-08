<template>
  <div id="app" class="text-center">
    <router-view />
  </div>
</template>

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

<script>
export default {
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        await this.$store.dispatch('auth/ping');
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
</script>
