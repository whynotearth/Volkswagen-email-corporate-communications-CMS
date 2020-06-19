<template>
  <div>
    test
  </div>
</template>

<script>
// import BaseButtonPro from '@/components/BaseButtonPro';
// import Calendar from '@/assets/calendar.svg';

export default {
  name: 'DeveloperTesting',
  // components: { BaseButtonPro },
  methods: {}
};
</script>

<style>
.agile__actions {
  margin-top: 20px;
}
.agile__dot {
  margin: 0 4px;
}
.agile__dot button {
  background-color: #011d51;
  transition-duration: 0.3s;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  width: 6px;
  height: 6px;
}
.agile__dot--current button {
  width: 12px;
  height: 12px;
}
.agile__slide * {
  height: 300px;
}
</style>
