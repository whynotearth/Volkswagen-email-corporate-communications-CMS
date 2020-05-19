<template>
  <nav class="flex items-strech items-center px-4 py-4 flex-wrap shadow-4dp z-10">
    <div class="container flex items-center px-0 md:px-6 justify-end">
      <div class="text-primary pr-3">{{ title }}</div>
      <div class="flex-start flex-shrink-0">
        <slot name="right-icon">
          <router-link :to="{ name: 'Settings' }" class="inline-block align-middle">
            <Setting />
          </router-link>
        </slot>
      </div>
    </div>
  </nav>
</template>

<script>
import Setting from '@/assets/setting.svg';

export default {
  name: 'BaseAppBarHeader',
  components: { Setting },
  props: {
    title: {
      type: String,
      required: true
    },
    action: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    select() {
      if (this.action.method === 'addEmail') {
        this.$emit('addEmail');
      } else if (this.action.method === 'editEmail') {
        this.$emit('editEmail');
      }
    }
  }
};
</script>

<style scoped>
.action-link {
  color: #03b3f9;
}
</style>
