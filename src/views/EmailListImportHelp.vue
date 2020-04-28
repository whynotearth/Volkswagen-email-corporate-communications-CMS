<template>
  <div class="">
    <BaseAppBarHeader title="Import Instructions" to-link="/settings/email-lists/import" />

    <div class="container px-0 md:px-6">
      <div class="text-left py-6 px-4">
        <div class="max-w-xs mx-auto mb-6">
          <div class="mx-12">
            <a
              download
              target="_blank"
              class="bg-secondary w-full block hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile text-center"
              href="https://res.cloudinary.com/whynotearth/raw/upload/v1588083489/Volkswagen/cms/Distribution_List_Template_ggqdjp.csv"
            >
              Download Template
            </a>
          </div>
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
          Email address is the only field that we require, but you can repeat this step for any other contact data
          fields you want to included.
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
  </div>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';

export default {
  name: 'EmailListImportHelp',
  components: { BaseAppBarHeader }
};
</script>
