<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader title="Choose Category" :to-link="{ name: 'Dashboard' }" />
    </template>
    <template #content>
      <div class="min-h-full relative bg-background">
        <ArticleAddStep1 />
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import ArticleAddStep1 from '@/components/ArticleAddStep1.vue';

export default {
  name: 'ArticleCategorySelection',
  components: {
    LayoutFixedScrollable,
    BaseAppBarHeader,
    ArticleAddStep1
  }
};
</script>
