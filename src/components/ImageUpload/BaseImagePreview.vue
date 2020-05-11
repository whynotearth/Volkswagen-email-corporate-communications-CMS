<template functional>
  <div class="upload-img--dimension m-1 h-full">
    <img @click="props.selectImage([props.image, props.index])" class="max-h-full cursor-pointer" :src="props.image" />
  </div>
</template>

<style scoped></style>
