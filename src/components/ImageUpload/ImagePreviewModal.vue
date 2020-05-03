<template>
  <div
    class="modal modal-backdrop z-50 overflow-hidden fixed inset-0 flex justify-center items-center"
    @click="closeModal"
  >
    <div class="modal-content w-screen h-screen sm:h-auto sm:w-auto">
      <div @click.stop class="w-screen h-screen sm:h-auto sm:w-auto px-0 relative">
        <button class="absolute left-0 top-0 pt-3 pl-3" @click.prevent="closeModal">
          <CancelIcon />
        </button>
        <img class="h-full w-full object-fill" :src="image.src" alt="image" />
        <button class="absolute bottom-0 right-0 pb-3 pr-3" @click.prevent="deleteImage">
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
