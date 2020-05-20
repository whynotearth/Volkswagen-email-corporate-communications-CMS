<template>
  <div class="text-secondary">
    <span>{{ counter }}</span>
  </div>
</template>

<script>
export default {
  name: 'BaseCounter',
  props: {
    date: {
      type: String,
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
      const date = new Date(this.date).getTime();
      const diff = date - now;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      return `
        ${this.convertTimeToString(hours)} : 
        ${this.convertTimeToString(mins)} : 
        ${this.convertTimeToString(secs)}
      `;
    },
    convertTimeToString(number) {
      return number <= 0 ? '00' : number > 0 && number < 10 ? `0${number}` : number;
    }
  }
};
</script>
