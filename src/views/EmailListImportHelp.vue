<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader title="Import Instructions" to-link="/settings/email-lists/import"></BaseAppBarHeader>
    </template>
    <template #content>
      <div class="container px-0 md:px-6">
        <div class="text-left py-6 px-4">
          <div class="max-w-xs mx-auto mb-6">
            <div class="mx-12">
              <a
                download
                target="_blank"
                class="bg-secondary w-full block hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile text-center"
                href="https://res.cloudinary.com/whynotearth/raw/upload/v1588239116/Volkswagen/cms/import-instructions/Distribution_List_Template_sng1ev.csv"
              >
                Download Template
              </a>
            </div>
          </div>

          <!-- descriptions -->
          <p>To prepare your file for import, follow these steps:</p>
          <p>1. In a spreadsheet program like Excel or Google Sheets, open your blank worksheet.</p>
          <p>2. Create and label a column for <b>Email Address</b>.</p>

          <div class="max-w-sm mx-auto my-4">
            <img
              class="block"
              src="https://res.cloudinary.com/whynotearth/image/upload/v1588182009/Volkswagen/cms/import-instructions/Step_2_bdcbzz.png"
              alt=""
            />
          </div>

          <p>
            3. Next to your Email Address column, create and label additional columns for <b>First Name</b> and
            <b>Last Name</b>.
          </p>
          <p>
            Email address is the only field that we require, but you can repeat this step for any other contact data
            fields you want to included.
          </p>

          <div class="max-w-sm mx-auto my-4">
            <img
              class="block"
              src="https://res.cloudinary.com/whynotearth/image/upload/v1588182010/Volkswagen/cms/import-instructions/Step_3_hcvhfw.png"
              alt=""
            />
          </div>

          <p>4. Paste your contacts’ information into the relevant fields in the spreadsheet.</p>

          <div class="max-w-sm mx-auto my-4">
            <img
              class="block"
              src="https://res.cloudinary.com/whynotearth/image/upload/v1588182021/Volkswagen/cms/import-instructions/Step_4_pwglpd.png"
              alt=""
            />
          </div>

          <p>
            5. Save the file in CSV format. This option can usually be access from the File menu in your spreadsheet
            program, labeled as “Export as .CSV” or “Download as .CSV”.
          </p>
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import NavigationBottom from '@/components/BaseNavigationBottom';

export default {
  name: 'EmailListImportHelp',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedScrollable }
};
</script>
