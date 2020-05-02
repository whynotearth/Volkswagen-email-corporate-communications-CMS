<template>
  <div class="loading bk-linear-gradient">
    <LogoBrand />
    <span class="loading-message tg-h3-mobile text-white">{{ message }}</span>
    {{ newPath }}
  </div>
</template>

<script>
import LogoBrand from '@/assets/logo.svg';

export default {
  name: 'ResetPassword',
  components: { LogoBrand },
  data() {
    return {
      message: ''
    };
  },
  props: {
    reset: {
      boolean: false
    },
    confirmReset: {
      boolean: false
    }
  },
  methods: {
    redirect() {
      if (this.reset) {
        this.message = 'Your password reset email is on the way!';
      }

      if (this.confirmReset) {
        this.message = 'Your password has been reset!';
      }
    }
  },
  computed: {
    newPath() {
      return this.redirect();
    }
  }
};
</script>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-message {
  margin-top: 24px;
  margin-right: 32px;
  margin-left: 32px;
}
</style>
