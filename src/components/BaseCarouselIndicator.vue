<template>
  <agile ref="carousel" :options="settings">
    <div class="slide" v-for="(item, index) in items" :key="index">
      <img class="m-auto" :src="item" />
    </div>
  </agile>
</template>

<script>
import { VueAgile } from 'vue-agile';

export default {
  name: 'BaseCarouselIndicator',
  components: { agile: VueAgile },
  props: {
    items: {
      type: Array,
      required: true
    },
    settings: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    items: {
      deep: true,
      handler() {
        // https://github.com/lukaszflorczak/vue-agile/issues/99
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.carousel.reload();
          }, 500);
        });
      }
    }
  }
};
</script>

<style>
.slide {
  width: 283px !important;
}
.agile__actions {
  margin-top: 20px;
}
.agile__dot {
  margin: 0 4px;
}
.agile__dots {
  height: 12px;
}
.agile__dot button {
  background-color: #011d51;
  transition-duration: 0.3s;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  width: 6px;
  height: 6px;
}
.agile__dot--current button {
  width: 12px;
  height: 12px;
}
.agile__slide * {
  height: 300px;
}
</style>
