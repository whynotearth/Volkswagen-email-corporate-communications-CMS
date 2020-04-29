<template>
  <div>
    <div class="smart--header p-6">
      <h2>Smart Suggestions</h2>
    </div>
    <div class="px-2 py-2">
      <SmartSuggestionCard v-for="(n, key) in 5" :key="key" class="my-2" />
      <div class="more-button flex justify-between">
        <p>See all smart suggestions.</p>
        <img
          src="https://user-images.githubusercontent.com/5694308/78672170-79e66e80-790a-11ea-8ed1-4ad16f9fdd31.png"
          alt="right-arrow"
          height="16"
          width="16"
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

<style>
.smart--header {
  font-family: Work Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  text-align: left;
  background-color: #03b3f9;
}

.smart--header h2 {
  color: white;
  opacity: 0.84;
}

.more-button {
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
}
</style>
