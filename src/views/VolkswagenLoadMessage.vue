<template>
  <div class="loading">
    <LogoBrand />
    <span class="loading-message">{{ message }}</span>
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
        setTimeout(() => this.$router.push({ name: 'NewPassword' }), 3000);
      }

      if (this.confirmReset) {
        this.message = 'Your password has been reset!';
        setTimeout(() => this.$router.push({ name: 'AuthLogin' }), 3000);
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
  background: radial-gradient(50% 49.2% at 0% 0.8%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%), #011d51;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-message {
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  margin-top: 28px;
  margin-right: 33px;
  margin-left: 33px;
  color: #fff;
}
</style>
