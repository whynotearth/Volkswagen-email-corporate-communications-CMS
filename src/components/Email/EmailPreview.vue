<template>
  <div class="bg-brand-gradient flex justify-center items-center min-h-104 p-4 -mx-4 md:m-0">
    <div class="max-w-sm min-h-full">
      <transition name="fade" mode="out-in">
        <Logo v-show="showLogo" :class="{ hidden: !showLogo }" />
      </transition>
      <transition name="fade" mode="out-in">
        <img v-show="!showLogo" :src="get_preview_link" @error="onError" @load="onLoad" />
      </transition>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/white_logo.svg';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'EmailPreview',
  components: { Logo },
  data() {
    return {
      showLogo: true
    };
  },
  computed: {
    ...mapGetters('email', ['get_preview_link'])
  },
  methods: {
    ...mapActions('email', ['update_preview_link']),
    onLoad() {
      this.showLogo = false;
    },
    onError() {
      this.showLogo = true;
      this.$emit('error');
      this.update_preview_link('');
    }
  }
};
</script>
