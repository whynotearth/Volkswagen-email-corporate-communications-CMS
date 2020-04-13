<template>
  <div>
    <PageNavigation />
    <div class="container mx-auto">
      <br />
      <br />
      <br />
      <div class="max-w-sm mx-auto">
        <input-text></input-text>
      </div>
    </div>
  </div>
</template>

<script>
import PageNavigation from '@/components/PageNavigation.vue';
import InputText from '@/components/BaseInputText.vue';

export default {
  name: 'Home',
  components: { PageNavigation, InputText }
};
</script>
