<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader :title="'JumpStart'" :to-link="{ name: 'Dashboard' }" />
    </template>
    <template #content>
      <div class="bg-white flex items-center justify-center min-h-full relative flex-shrink-0 py-6">
        <div class="w-full">
          <div class="max-w-sm mx-auto px-12">
            <div class="mb-4">
              <img
                class="w-24 h-24 mx-auto block"
                src="https://res.cloudinary.com/whynotearth/image/upload/v1588067012/Volkswagen/cms/Volkswagen_logo_2019_1_ddafyt.svg"
                alt=""
              />
            </div>
            <h1 class="text-primary h1-mobile md:h1 mb-h1-mobile mb-14">
              Manage the JumpStart
            </h1>

            <div>
              <router-link
                :to="{ name: 'JumpStartLists' }"
                class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile mb-6"
              >
                Scheduled Newsletters
              </router-link>
              <router-link
                :to="{ name: 'JumpStartActivityList' }"
                class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile"
              >
                JumpStart Stats
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <BaseNavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import LayoutFixedFooter from '@/components/LayoutFixedFooter.vue';
import BaseNavigationBottom from '@/components/BaseNavigationBottom.vue';

export default {
  name: 'BlueDeltaMain',
  components: { LayoutFixedFooter, BaseAppBarHeader, BaseNavigationBottom }
};
</script>
