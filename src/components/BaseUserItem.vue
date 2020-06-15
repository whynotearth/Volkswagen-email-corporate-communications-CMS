<template>
  <div class="flex flex-wrap items-center text-left px-4 py-3 justify-end bg-surface">
    <div class="w-12 h-12 mr-4 flex-0">
      <UserAvatar
        src="https://res.cloudinary.com/whynotearth/image/upload/v1592229437/Volkswagen/cms/avatar-default_xvrvu8.png"
        :alt="'user-image'"
      />
    </div>
    <div class="flex-1">
      <div class="w-full tg-body-mobile">{{ fullName }}</div>
      <div class="w-full text-black em-medium text-xs pt-1 tg-caption-mobile">(510) 123-1234 - {{ item.email }}</div>
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
  },
  computed: {
    fullName() {
      return `${this.item.firstName || '-'} ${this.item.lastName || ''}`;
    }
  }
};
</script>
