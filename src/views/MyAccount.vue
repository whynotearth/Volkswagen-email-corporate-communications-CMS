<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader title="My Account" :to-link="{ name: 'Settings' }"></BaseAppBarHeader>
    </template>
    <template #content>
      <div>
        <div class="bg-brand-gradient ">
          <BaseUserAccountCard class="w-full relative container px-0 py-8" />
        </div>
        <div class="container pt-6 pb-8 mb-4 text-left">
          <BaseUserAccountInfo :to-link="{ name: 'ResetPassword' }" />
        </div>
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import BaseUserAccountCard from '@/components/BaseUserAccountCard';
import BaseUserAccountInfo from '@/components/BaseUserAccountInfo';

export default {
  name: 'MyAccount',
  components: { BaseAppBarHeader, LayoutFixedScrollable, BaseUserAccountCard, BaseUserAccountInfo },
  methods: {}
};
</script>
