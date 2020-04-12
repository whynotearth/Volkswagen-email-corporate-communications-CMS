<template>
  <div>
    <PageNavigation />
    <div class="container mx-auto">
      <div class="display-1">display 1: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, accusantium!</div>
    </div>
  </div>
</template>

<script>
import PageNavigation from '@/components/PageNavigation.vue';

export default {
  name: 'Home',
  components: { PageNavigation }
};
</script>
