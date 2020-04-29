<template>
  <LayoutFixedScrollable>
    <template #content>
      <div>
        <BaseAppBarHeader :title="'Email Campaign'" :to-link="'/settings'" />
        <div class="container px-0 md:px-6">
          <div class="flex items-strech items-center border-b-1 border-divider">
            <router-link
              to="email-lists"
              class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
            >
              <span class="mr-2 tg-body-mobile">Manage Email Lists</span>
              <svg
                class="transform -scale-x-1 text-gray"
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.4 1.4L6 0L0 6L6 12L7.4 10.6L2.8 6L7.4 1.4Z"
                  fill="currentColor"
                />
              </svg>
            </router-link>
          </div>
        </div>
        <!-- <div class="flex items-strech items-center border-b-1 border-divider">
          <router-link
            to="/"
            class="link-fordward block flex-grow justify-between flex h-full items-center cursor-pointer select-none px-4 pr-6 py-5"
          >
            <span class="mr-2 tg-body-mobile">Set Default Email Time</span>
            <svg
              class="transform -scale-x-1 text-gray"
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.4 1.4L6 0L0 6L6 12L7.4 10.6L2.8 6L7.4 1.4Z"
                fill="currentColor"
              />
            </svg>
          </router-link>
        </div> -->
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
  name: 'EmailCampaign',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedScrollable }
};
</script>

<style scoped>
.text-gray {
  color: rgba(0, 0, 0, 0.54);
}
</style>
