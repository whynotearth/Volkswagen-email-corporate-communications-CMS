<template functional>
  <div class="page h-full flex flex-col position-relative">
    <slot name="header" />
    <div class="flex-grow z-2 overflow-y-hidden">
      <div class="px-0 overflow-y-auto overflow-x-hidden flex flex-col h-full narrow-scrollbars pb-14">
        <slot name="content" />
      </div>
      <div class="fixed bottom-0 w-full"><slot name="footer" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutFixedFooter'
};
</script>
