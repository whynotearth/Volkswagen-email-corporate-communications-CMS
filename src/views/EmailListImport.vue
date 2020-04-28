<template>
  <div class="">
    <BaseAppBarHeader title="Add New List" to-link="/settings/email-lists" />

    <div class="container px-0 md:px-6">
      <div class="text-left py-6 px-4">
        <p class="mb-6">
          Please upload your contact file below. A template file can be downloaded
          <a
            class="text-secondary underline"
            download
            href="https://res.cloudinary.com/whynotearth/raw/upload/v1588083489/Volkswagen/cms/Distribution_List_Template_ggqdjp.csv"
            >here</a
          >.
        </p>

        <!-- uploader -->
        <div class="mb-6">
          <div class="pb-6">
            <BaseInputFile :files="files" placeholder="Upload Files" accepts=".csv" @change="onChangeFile" />
          </div>
          <div class="mb-6">
            <div class="max-w-xs mx-auto">
              <div class=" mx-12">
                <button
                  :class="{ 'bg-gray': files.length === 0 }"
                  class="bg-secondary w-full block hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile"
                  type="button"
                  @click="submit()"
                >
                  Import New Group
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseInputFile from '@/components/BaseInputFile.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { ajax } from '@/connection/ajax.js';
import { sleep } from '@/helpers.js';

export default {
  name: 'EmailLists',
  components: { BaseAppBarHeader, BaseInputFile },
  data: () => ({
    files: []
  }),
  computed: {
    // ...mapGetters('distributionGroup', ['getEmailLists']),
    get_email_lists() {
      return this.$store.getters['distributionGroup/getEmailLists'];
    }
  },
  methods: {
    ...mapActions('distributionGroup', ['importEmailList', 'getEmailLists']),
    ...mapMutations('distributionGroup', ['selectEmailList', 'updateEmailLists']),
    onChangeFile(event) {
      this.files = event.target.files;
    },
    submit(event) {
      try {
        this.importEmailList({
          ajax,
          body: {
            file: this.files[0]
          }
        });
        this.onSuccessSubmit();
      } catch (error) {}
    },
    async onSuccessSubmit() {
      this.$store.commit('overlay/updateModel', {
        title: 'Success!',
        message: ''
      });

      await sleep(1000);

      await this.getEmailLists();
      const groupName = this.get_email_lists[0].distributionGroup;

      await this.$router.push({
        name: 'EmailList',
        params: {
          groupName
        }
      });

      this.$store.commit('overlay/updateModel', {
        title: '',
        message: ''
      });
    }
  }
};
</script>

<style scoped>
.item-details {
  color: rgba(0, 0, 0, 0.38);
}
</style>
