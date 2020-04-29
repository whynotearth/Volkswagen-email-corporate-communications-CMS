<template functional>
  <div :class="[...props.classes]" class="email-info flex flex-col items-center">
    <div class="email-info__number mb-2">
      {{ props.emailInfo.total }}
    </div>
    <div class="email-info__name mb-4">
      <h3>
        {{ props.emailInfo.name }}
      </h3>
    </div>
  </div>
</template>

<style scoped>
.email-info__number {
  font-family: Work Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 40px;
  background: linear-gradient(90deg, #0374f9 0%, #03b3f9 100%);
  background-clip: text;
  text-fill-color: transparent;
  color: transparent;
}

.email-info__number:nth-child(2) {
  border: 1px solid white;
}

.email-info__name h3 {
  font-family: Work Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  color: white;
  opacity: 0.54;
}
</style>
