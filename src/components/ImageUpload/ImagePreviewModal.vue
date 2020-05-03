<template>
  <div
    class="modal modal-backdrop z-50 overflow-hidden fixed inset-0 flex justify-center items-center"
    @click="closeModal"
  >
    <div class="modal-content flex items-center container px-0 sm:px-4 md:px-6 text-left w-screen h-screen relative">
      <div @click.stop class="flex flex-col justify-center items-center sm:h-full sm:w-full px-0">
        <button class="absolute left-0 top-0 flex justify-start p-6" @click.prevent="closeModal">
          <CancelIcon />
        </button>
        <div class="w-screen sm:w-full">
          <img class="w-full object-fill" :src="image.src" alt="image" />
        </div>
        <button class="absolute right-0 bottom-0 flex justify-end p-6" @click.prevent="deleteImage">
          <DeleteIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CancelIcon from '@/assets/cancel.svg';
import DeleteIcon from '@/assets/delete.svg';

export default {
  name: 'ImagePreviewModal',
  props: ['image'],
  components: { CancelIcon, DeleteIcon },
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

<style scoped>
.modal-backdrop {
  background: rgba(0, 0, 0, 0.54);
}
</style>
