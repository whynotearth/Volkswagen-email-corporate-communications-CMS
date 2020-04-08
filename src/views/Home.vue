<template>
  <div class="container mx-auto">
    <div class="max-w-xs mx-auto">
      <div class="flex flex-wrap my-4 ">
        <div class="w-full bg-gray-500 h-12">
          <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p v-if="isAuthenticated" class="mb-4">
              <router-link
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                to="/posts/add"
                >Add a post</router-link
              >
            </p>
            <p v-if="!isAuthenticated" class="mb-4">
              <router-link
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                to="/login"
                >Login</router-link
              >
            </p>

            <p v-if="isAuthenticated" class="mb-4">
              <a
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                @click="logout()"
                >logout</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logout');
        this.$store.dispatch('snackbar/show', {
          color: 'success',
          text: 'Logging out was successful',
          class: 'dark--text'
        });
      } catch (error) {
        this.$store.dispatch('snackbar/show', {
          color: 'error',
          text: 'Logging out was unsuccessful',
          class: 'light--text'
        });
      }
    }
  }
};
</script>
