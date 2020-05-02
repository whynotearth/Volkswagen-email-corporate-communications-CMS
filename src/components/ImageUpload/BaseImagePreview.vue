<template functional>
  <div class="upload-img--dimension m-1">
    <img @click="props.selectImage([props.image, props.index])" class="h-full w-full object-cover" :src="props.image" />
  </div>
</template>

<style scoped></style>
