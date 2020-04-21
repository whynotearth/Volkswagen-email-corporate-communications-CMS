<template>
  <div class="">
    <AppBarHeader :title="'Marketing'" :to-link="'/'" :action="{ link: '/', label: 'Add New' }" />
    <div class="flex">
      <ul class="w-full pt-4">
        <li class="flex text-left px-4 py-4">
          <router-link to="/">
            <div>thisisanemail@gmail.com</div>
            <div class="item-details text-xs pt-1">
              Jan 20, 2019
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import AppBarHeader from '@/components/AppBarHeader.vue';

export default {
  name: 'Marketing',
  components: { AppBarHeader }
};
</script>

<style scoped>
.item-details {
  color: rgba(0, 0, 0, 0.38);
}
</style>
