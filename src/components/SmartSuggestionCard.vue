<template>
  <div class="smart-card border">
    <div>
      <div class="p-4">
        <h3 class="smart-title mb-2">Respect Cafeteria Hours</h3>
        <p class="smart-body">Move article to tomorrow? There are currently 2 articles scheduled for tomorrow.</p>
      </div>
      <div class="border-t">
        <div class="flex justify-end mr-4">
          <button class="smart-button smart-button--blue mr-2 p-4">APPROVE</button>
          <button class="smart-button--red p-4">OVERFLOW</button>
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
.smart-card {
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14);
}

.smart-title,
.smart-body {
  font-family: Work Sans;
  font-style: normal;
  text-align: left;
  color: #000000;
}

.smart-title {
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  opacity: 0.84;
}

.smart-body {
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  opacity: 0.54;
}

.smart-button {
  font-family: Work Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.smart-button--blue {
  color: #03b3f9;
}

.smart-button--red {
  color: #ff5959;
}
</style>
