<template>
  <div class="counter--color">
    <span>{{ counter }}</span>
  </div>
</template>

<script>
export default {
  name: 'BaseCounter',
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  data() {
    return {
      counter: this.updateCounter()
    };
  },
  created() {
    const counterInterval = setInterval(() => {
      this.counter = this.updateCounter();
    }, 1000);

    this.$on('hook:destroyed', () => {
      clearInterval('counterInterval');
    });
  },
  methods: {
    updateCounter() {
      const now = new Date().getTime();
      const diff = this.date - now;

      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      return `
        ${hours < 10 ? '0' + hours : hours} : 
        ${mins < 10 ? '0' + mins : mins} : 
        ${secs < 10 ? '0' + secs : secs}
      `;
    }
  }
};
</script>

<style>
.counter--color {
  color: #03b3f9;
}
</style>
