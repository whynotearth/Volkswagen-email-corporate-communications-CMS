<template>
  <nav class="flex items-strech items-center px-4 py-4 flex-wrap shadow-4dp z-10">
    <div class="container flex items-center px-0 md:px-6 justify-end">
      <div class="text-primary pr-3">{{ title }}</div>
      <div class="flex-start flex-shrink-0">
        <router-link class="inline-block align-middle" :to="toLink">
          <SettingIcon />
        </router-link>
      </div>
      <!-- The link only routing -->
      <router-link
        v-if="action && !action.method"
        class="flex-grow flex-shrink-0 inline-block action-link tg-h3-mobile text-left"
        :to="action.link"
        >{{ action.label }}</router-link
      >
      <!-- The link has a action, emit a method, like finish (Add, Edit) -->
      <div
        v-if="action && action.method"
        class="flex-grow flex-shrink-0 inline-block action-link tg-h3-mobile text-right cursor-pointer"
        :class="{ disabled: action.disabled }"
        @click="select()"
      >
        {{ action.label }}
      </div>
      <slot name="menu"></slot>
    </div>
  </nav>
</template>

<script>
import SettingIcon from '@/assets/setting.svg';
export default {
  name: 'BaseAppBarHeader',
  components: { SettingIcon },
  props: {
    title: {
      type: String,
      required: true
    },
    toLink: {
      default: '/settings'
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
