<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader title="My Account" :to-link="{ name: 'Settings' }"></BaseAppBarHeader>
    </template>
    <template #content>
      <div>
        <div class="bg-brand-gradient ">
          <UserAccountCard fullname="Xavier Jasso" />
        </div>
        <div class="container pt-6 pb-8 mb-4 text-left">
          <UserAccountInfo :to-link="{ name: 'AuthResetPassword' }" />
        </div>
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import UserAccountCard from '@/components/UserAccountCard';
import UserAccountInfo from '@/components/UserAccountInfo';

export default {
  name: 'MyAccount',
  components: { BaseAppBarHeader, LayoutFixedScrollable, UserAccountCard, UserAccountInfo }
};
</script>
