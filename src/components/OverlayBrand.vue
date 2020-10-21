<template>
  <div class="bg-brand-gradient flex items-center justify-center h-full">
    <div>
      <div class="progress-wrapper mb-4 md:mb-12 mx-auto">
        <!-- desktop -->
        <BaseProgressCircle
          class="hidden md:block"
          :centerX="164"
          :centerY="164"
          :radius="160"
          :percentageProgress="progress"
        >
          <image
            class="progress-circle--content block"
            x="20"
            y="20"
            width="288"
            height="288"
            xlink:href="https://res.cloudinary.com/die9ji2vn/image/upload/f_auto/v1578304830/Home%20Page/logo2_qoiy2d.png"
          ></image>
        </BaseProgressCircle>

        <!-- mobile -->
        <BaseProgressCircle
          class="block md:hidden"
          :centerX="82"
          :centerY="82"
          :radius="80"
          :percentageProgress="progress"
        >
          <image
            class="progress-circle--content block"
            x="10"
            y="10"
            width="144"
            height="144"
            xlink:href="https://res.cloudinary.com/die9ji2vn/image/upload/f_auto/v1578304830/Home%20Page/logo2_qoiy2d.png"
          ></image>
        </BaseProgressCircle>
      </div>
      <p v-if="title" class="text-white headline md:display-3 mb-4">{{ title }}</p>
      <p v-if="message" class="text-white body-1">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import BaseProgressCircle from '@/components/BaseProgressCircle.vue';

export default {
  name: 'OverlayBrand',
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
    },
    isVisible: {
      default: false
    }
  },
  mounted() {
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
@screen md {
  .progress-wrapper {
    width: 328px;
    height: 328px;
  }
}
</style>
