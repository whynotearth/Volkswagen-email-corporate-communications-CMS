<template functional>
  <div class="page h-full flex flex-col">
    <slot name="header" />
    <div class="flex-grow z-10 overflow-y-auto narrow-scrollbars">
      <div class="px-0 flex flex-col h-full">
        <slot name="content" />
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: 'LayoutMiddleScrollable'
};
</script>
