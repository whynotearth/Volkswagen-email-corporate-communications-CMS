<template>
  <div class="">
    <BaseAppBarHeader title="Add New List" :to-link="'/settings'" />
    <div class="text-left py-6 px-4">
      <!-- uploader -->
      <div class="mb-6">
        <div class="pb-6">
          <input class="max-w-full" type="file" @change="onChangeFile" accept=".csv" />

          {{ file && file.name }}
        </div>
        <div class="mb-6">
          <button
            class="bg-primary w-1/2 md:w-1/4 mx-auto block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile"
            type="button"
            @click="submit()"
          >
            Import
          </button>
        </div>
        <hr />
      </div>

      <!-- descriptions -->
      <p>To prepare your file for import, follow these steps:</p>
      <p>1. In a spreadsheet program like Excel or Google Sheets, open your blank worksheet.</p>
      <p>2. Create and label a column for Email Address.</p>

      <img
        class="block"
        src="https://res.cloudinary.com/whynotearth/image/upload/v1587717898/Volkswagen/cms/79423285-89d80f80-7fe8-11ea-92dc-c7c3a70e985b_wr0tdn.png"
        alt=""
      />

      <p>3. Next to your Email Address column, create and label additional columns for First Name and Last Name.</p>
      <p>
        Email address is the only field that we require, but you can repeat this step for any other contact data fields
        you want to included.
      </p>

      <img
        class="block"
        src="https://res.cloudinary.com/whynotearth/image/upload/v1587717899/Volkswagen/cms/79423287-8b093c80-7fe8-11ea-858b-8aceab4aa6ab_ymh7kk.png"
        alt=""
      />

      <p>4. Paste your contacts’ information into the relevant fields in the spreadsheet.</p>

      <img
        class="block"
        src="https://res.cloudinary.com/whynotearth/image/upload/v1587717900/Volkswagen/cms/79423288-8ba1d300-7fe8-11ea-8ca6-23eeebeff8d7_bbrgup.png"
        alt=""
      />

      <p>
        5. Save the file in CSV format. This option can usually be access from the File menu in your spreadsheet
        program, labeled as “Export as .CSV” or “Download as .CSV”.
      </p>
    </div>
  </div>
</template>
<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { ajax } from '@/connection/ajax.js';
import { sleep } from '@/helpers.js';

export default {
  name: 'EmailLists',
  components: { BaseAppBarHeader },
  data: () => ({
    file: undefined
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
      this.file = event.target.files[0];
    },
    submit(event) {
      try {
        this.importEmailList({
          ajax,
          body: {
            file: this.file
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
