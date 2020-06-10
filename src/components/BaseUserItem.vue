<template>
  <div class="flex flex-wrap items-center text-left px-4 py-3 justify-end">
    <div class="w-12 h-12 mr-4 flex-0">
      <UserAvatar :src="'https://www.callart.com.tr/public/assets/img/blog/avatar.png'" :alt="'user-image'" />
    </div>
    <div class="flex-1">
      <div class="w-full tg-body-mobile">{{ item.name }}</div>
      <div class="w-full item-details text-xs pt-1 tg-caption-mobile">
        (510) 123-1234 - thisisanemail@gmail.com
      </div>
    </div>
    <slot name="more"></slot>
  </div>
</template>

<script>
import UserAvatar from '@/components/UserAvatar';

export default {
  name: 'UserList',
  components: { UserAvatar },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style scoped>
.item-details {
  color: rgba(0, 0, 0, 0.54);
}
</style>
