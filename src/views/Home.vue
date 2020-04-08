<template>
  <div>
    <p v-if="isAuthenticated">
      <router-link to="/posts/add">Add a post</router-link>
    </p>
    <p v-if="!isAuthenticated">
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {},
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  }
};
</script>
