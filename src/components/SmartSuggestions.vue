<template>
  <div>
    <div class="tg-h2-mobile bg-secondary p-6">
      <h2 class="w-full relative container text-left text-white em-high">Smart Suggestions</h2>
    </div>
    <div class="w-full relative container p-2">
      <SmartSuggestionCard v-for="(n, key) in 5" :key="key" class="my-2" />
      <div class="tg-body-mobile flex justify-between mr-4 mt-8">
        <p class="px-4">See all smart suggestions</p>
        <img
          src="https://user-images.githubusercontent.com/5694308/78672170-79e66e80-790a-11ea-8ed1-4ad16f9fdd31.png"
          alt="right-arrow"
          height="16"
          width="16"
          class="mx-4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SmartSuggestionCard from './SmartSuggestionCard';

export default {
  name: 'SmartSuggestions',
  components: { SmartSuggestionCard }
};
</script>
