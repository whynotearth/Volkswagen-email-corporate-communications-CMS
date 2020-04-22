<template>
  <div>
    <!-- header -->
    <!-- search input -->
    <!-- memo item -->
    <!-- tabs: opened/unread -->
    <!-- list of emails -->

    <BaseProgressBar :label="`Open rate: 22%`" :progress="22" />
  </div>
</template>

<script>
import BaseProgressBar from '@/components/BaseProgressBar.vue';

export default {
  name: 'ActivityFeedMemoItem',
  components: { BaseProgressBar }
};
</script>
