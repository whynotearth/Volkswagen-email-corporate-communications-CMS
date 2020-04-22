<template>
  <div>
    <!-- header -->
    <!-- search input -->
    <!-- memo item -->
    <!-- tabs: opened/unread -->
    <!-- list of emails -->

    <div class="mb-4">
      <BaseProgressBar :label="`Open rate: 22%`" :progress="22" />
    </div>

    <BaseTabs>
      <BaseTab class="text-left" name="Services" :selected="true">
        <span>What we do</span>
      </BaseTab>
      <BaseTab class="text-left" name="Pricing">
        <span>How much we do it for</span>
      </BaseTab>
      <BaseTab class="text-left" name="About Us">
        <span>Why we do it</span>
      </BaseTab>
    </BaseTabs>
  </div>
</template>

<script>
import BaseProgressBar from '@/components/BaseProgressBar.vue';
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTab from '@/components/BaseTab.vue';

export default {
  name: 'ActivityFeedMemoItem',
  components: { BaseProgressBar, BaseTabs, BaseTab }
};
</script>
