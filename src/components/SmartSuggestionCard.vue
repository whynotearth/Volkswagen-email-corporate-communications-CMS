<template>
  <div class="shadow-card rounded border">
    <div>
      <div class="bg-background p-4 text-left text-black">
        <h3 class="tg-h3-mobile mb-2 em-high">Respect Cafeteria Hours</h3>
        <p class="tg-body-mobile em-medium">
          Move article to tomorrow? There are currently 2 articles scheduled for tomorrow.
        </p>
      </div>
      <div class="border-t">
        <div class="flex justify-end mr-4">
          <button class="font-medium uppercase text-sm leading-normal tracking-wide text-secondary mr-2 p-4">
            APPROVE
          </button>
          <button class="font-medium uppercase text-sm leading-normal tracking-wide smart-button--red p-4">
            OVERFLOW
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmartSuggestionCard'
};
</script>

<style scoped>
.smart-button--red {
  color: #ff5959;
}
</style>
