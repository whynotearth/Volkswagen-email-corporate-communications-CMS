<template functional>
  <div :class="[props.classes]" class="email-info flex flex-col items-center">
    <div class="email-info__number leading-10 text-5xl text-transparent bg-brand-light-blue-gradient mb-2">
      {{ props.emailInfo.total }}
    </div>
    <div class="email-info__name mb-4">
      <h3 class="tg-h3-mobile em-medium text-white">
        {{ props.emailInfo.name }}
      </h3>
    </div>
  </div>
</template>

<style scoped>
.email-info__number {
  background-clip: text;
}
</style>
