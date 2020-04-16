<template>
  <div class="h-screen bg-brand-gradient flex items-center justify-center">
    <div>
      <div class="progress-wrapper mb-4">
        <BaseProgressCircle :centerX="82" :centerY="82" :radius="80" :percentageProgress="progress">
          <image
            class="progress-circle--content"
            x="10"
            y="10"
            width="144"
            height="144"
            xlink:href="https://res.cloudinary.com/whynotearth/image/upload/v1586859428/Volkswagen/cms/logo-light_um5gka.svg"
          ></image>
        </BaseProgressCircle>
      </div>

      <p v-if="title !== '-'" class="text-white headline">{{ title }}</p>
      <p v-if="message" class="text-white body-1">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import BaseProgressCircle from '@/components/BaseProgressCircle.vue';

export default {
  name: 'ResultScreen',
  components: { BaseProgressCircle },
  data: () => ({
    progress: 0
  }),
  props: {
    title: {
      default: ''
    },
    message: {
      default: ''
    }
  },
  mounted() {
    console.log('this', this);

    setTimeout(() => {
      this.progress = 1;
    }, 300);
  }
};
</script>

<style scoped>
.progress-wrapper {
  width: 164px;
  height: 164px;
}
</style>
