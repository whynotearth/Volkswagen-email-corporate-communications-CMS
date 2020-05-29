<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="'Articles'" :to-link="{ name: 'Dashboard' }" />
    </template>
    <template #content>
      <div class="bg-white flex items-center justify-center min-h-full relative">
        <div class="w-full">
          <div class="max-w-sm mx-auto px-12">
            <div class="mb-4">
              <img
                class="w-24 h-24 mx-auto block"
                src="https://res.cloudinary.com/whynotearth/image/upload/v1588067012/Volkswagen/cms/Volkswagen_logo_2019_1_ddafyt.svg"
                alt=""
              />
            </div>
            <h1 class="text-primary h1-mobile md:h1 mb-h1-mobile">
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
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseNavigationBottom from '@/components/BaseNavigationBottom.vue';

export default {
  name: 'ArticleMain',
  components: { LayoutFixedScrollable, BaseAppBarHeader, BaseNavigationBottom }
};
</script>

<style scoped>
.mb-h1-mobile {
  margin-bottom: 56px;
}
</style>
