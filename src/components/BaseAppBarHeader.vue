<template>
  <nav class="flex items-strech items-center px-4 py-4 flex-wrap shadow-4dp">
    <div class="container flex px-0 md:px-6">
      <div class="flex-start mr-3">
        <router-link class="inline-block align-middle" :to="toLink">
          <img src="https://res.cloudinary.com/whynotearth/image/upload/v1587102533/Volkswagen/cms/back_oay5wt.png" />
        </router-link>
      </div>
      <div class="text-primary h2-mobile">{{ title }}</div>
      <router-link
        v-if="action && !action.method"
        class="flex-grow inline-block action-link tg-h3-mobile text-right"
        :to="action.link"
        >{{ action.label }}</router-link
      >
      <div
        v-if="action && action.method"
        class="flex-grow inline-block action-link tg-h3-mobile text-right cursor-pointer"
        :class="{ disabled: action.disabled }"
        @click="select()"
      >
        {{ action.label }}
      </div>
      <slot></slot>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'BaseAppBarHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    toLink: {
      type: String,
      default: '/'
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
  font-weight: 500;
}
.disabled {
  color: rgba(0, 0, 0, 0.38);
  cursor: default;
}
</style>
