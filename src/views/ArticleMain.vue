<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader :title="'Articles'" :to-link="{ name: 'Dashboard' }" />
    </template>
    <template #content>
      <div class="bg-white flex items-center justify-center min-h-full relative flex-shrink-0 py-6">
        <div class="w-full">
          <div class="max-w-sm mx-auto px-12">
            <div class="mb-4">
              <img
                class="w-30 h-24 mx-auto block"
                src="https://res.cloudinary.com/die9ji2vn/image/upload/v1603095054/vk-new-logo_ik4ew5.png"
                alt=""
              />
            </div>
            <h1 class="text-primary h1-mobile md:h1 mb-h1-mobile mb-14">
              Time to make some content!
            </h1>

            <div>
              <router-link
                :to="{ name: 'ArticleLists' }"
                class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile mb-6"
              >
                SCHEDULED ARTICLES
              </router-link>
              <router-link
                :to="{ name: 'ArticleAdd' }"
                class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile"
              >
                NEW ARTICLE
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
  name: 'ArticleMain',
  components: { LayoutFixedFooter, BaseAppBarHeader, BaseNavigationBottom }
};
</script>
