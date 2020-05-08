<template>
  <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <!-- <svg
        class="fill-current h-8 w-8 mr-2"
        width="54"
        height="54"
        viewBox="0 0 54 54"
        xmlns="http://www.w3.org/2000/svg"
      >
        ...
      </svg> -->
      <span class="font-semibold text-xl tracking-tight">VW Emails CMS</span>
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <router-link
          v-if="isAuthenticated"
          to="/memo/add"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          Add Memo
        </router-link>
      </div>
      <div class="text-sm lg:flex-grow">
        <router-link
          v-if="isAuthenticated"
          to="/articles/add"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          Add a article
        </router-link>
      </div>
      <div>
        <a
          v-if="isAuthenticated"
          @click="logout()"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        >
          Logout
        </a>
        <router-link
          v-if="!isAuthenticated"
          to="/login"
          class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
        >
          Login
        </router-link>
        <span
          v-if="isAuthenticated"
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >{{ user.userName }}</span
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
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
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['authKeep/isAuthenticated'];
    },
    user() {
      return this.$store.getters['authKeep/user'];
    }
  }
};
</script>
