<template>
  <div class="modal overflow-hidden fixed inset-0 flex justify-center items-center" @click="closeModal">
    <div class="modal-content w-screen h-screen sm:h-auto sm:w-auto">
      <div @click.stop class="w-screen h-screen sm:h-auto sm:w-auto px-0 relative">
        <button class="absolute left-0 top-0" @click.prevent="closeModal">
          CLOSE
        </button>
        <img class="h-full w-full object-fill" :src="image.src" alt="image" />
        <button class="absolute bottom-0 right-0" @click.prevent="deleteImage">
          DELETE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagePreviewModal',
  props: ['image'],
  methods: {
    closeModal() {
      this.$emit('resetSelectedImage');
    },
    deleteImage() {
      this.$emit('deleteImage', this.image.index);
      this.closeModal();
    }
  }
};
</script>

<style scoped></style>
