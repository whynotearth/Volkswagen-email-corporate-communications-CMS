<template>
  <div
    class="modal modal-backdrop z-50 fixed overflow-y-auto inset-0 flex justify-center items-center"
    @click="closeModal"
  >
    <div class="modal-content flex items-center text-left w-full h-screen relative">
      <div @click.stop class="flex flex-col justify-between w-full h-full px-0">
        <div class="bg-white flex-shrink-0">
          <div class="container flex justify-start">
            <button class="py-4 opacity-75" @click.prevent="closeModal" title="Close">
              <CancelIcon />
            </button>
          </div>
        </div>
        <div class="w-full flex justify-center flex-shrink-0">
          <div class="py-4">
            <img class="max-h-full" :src="image.url" alt="image" />
          </div>
        </div>
        <div class="bg-white flex-shrink-0">
          <div class="container flex justify-end">
            <button class="py-4 opacity-75" @click.prevent="deleteImage" title="Delete">
              <DeleteIcon />
            </button>
          </div>
        </div>
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
