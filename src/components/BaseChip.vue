<template functional>
  <div class="chip rounded-full bg-surface border-1 border-divider inline-flex px-5">
    <div class="py-1 text-black tg-caption-mobile em-high">
      {{ props.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseChip'
};
</script>
