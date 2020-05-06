<template>
  <div class="">
    <BaseAppBarHeader title="Blue Delta" :to-link="{ name: 'Dashboard' }" />
    <div class="flex">
      <JumpStartItem />
    </div>
  </div>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import JumpStartItem from '@/components/admin/JumpStartItem.vue';

export default {
  name: 'JumpStart',
  components: { BaseAppBarHeader, JumpStartItem }
};
</script>
