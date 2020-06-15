<template>
  <nav class="px-4 py-4 shadow-4dp z-30">
    <div class="container flex items-center justify-between px-0 md:px-6">
      <!-- start side -->
      <div class="appbar-startside flex items-center">
        <div v-if="toLink" class="flex-shrink-0">
          <router-link class="inline-block align-middle" :to="toLink">
            <img
              class="md:w-6 md:h-6"
              src="https://res.cloudinary.com/whynotearth/image/upload/v1587102533/Volkswagen/cms/back_oay5wt.png"
            />
          </router-link>
        </div>
        <div v-if="title" class="text-primary tg-h2-mobile md:tg-h2-desktop truncate pl-8 md:pb-2">{{ title }}</div>
      </div>

      <!-- end side -->
      <div class="appbar-endside flex-shrink-0 pl-2">
        <!-- TODO: probably using slot is better -->
        <!-- The link only routing -->
        <router-link
          v-if="action && !action.method"
          class="flex-grow flex-shrink-0 inline-block action-link tg-h3-mobile text-right"
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

        <div v-if="showSettingsLink" class="flex items-center">
          <div v-if="titleEnd" class="tg-body-mobile text-primary pr-3">{{ titleEnd }}</div>
          <div class="flex-start flex-shrink-0">
            <router-link :to="{ name: 'Settings' }" class="inline-block align-middle">
              <Setting />
            </router-link>
          </div>
        </div>
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
      type: String
    },
    titleEnd: {
      type: String
    },
    toLink: {
      type: [String, Object],
      default: ''
    },
    action: {
      type: Object,
      default: () => {}
    },
    showSettingsLink: {
      default: false,
      type: Boolean
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
.appbar-startside {
  min-width: 0;
}
.action-link {
  color: #03b3f9;
  font-weight: 500;
}
.disabled {
  color: rgba(0, 0, 0, 0.38);
  cursor: default;
}
</style>
