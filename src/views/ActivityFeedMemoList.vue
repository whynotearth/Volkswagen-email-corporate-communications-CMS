<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="'Memo Stats'" :to-link="{ name: 'Stats' }" />

      <!-- <div class="container px-0 md:px-6 text-left">
        <div class="px-2 pt-4 mb-4">
          <ActivityFeedSearchBox />
        </div>
      </div> -->
    </template>

    <template #content>
      <div class="container py-4 flex justify-center" v-if="!is_fetch_memo">
        <div class="loader"></div>
      </div>
      <div class="container px-0 md:px-6 text-left">
        <div class="px-4 pt-4">
          <div class="mb-8" v-for="memoItem in get_memos" :key="memoItem.id">
            <router-link
              class="cursor-pointer block bg-background text-black hover:text-secondary"
              :to="{ name: 'ActivityFeedMemoItem', params: { id: memoItem.id } }"
            >
              <MemoListItem :model="memoItem" />
            </router-link>
          </div>
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
// import ActivityFeedSearchBox from '@/components/ActivityFeedSearchBox.vue';
import MemoListItem from '@/components/MemoListItem.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import { mapGetters, mapActions } from 'vuex';
import NavigationBottom from '@/components/BaseNavigationBottom';

export default {
  name: 'ActivityFeedMemoList',
  // ActivityFeedSearchBox
  components: { MemoListItem, BaseAppBarHeader, LayoutFixedScrollable, NavigationBottom },
  computed: {
    ...mapGetters('memo', ['get_memos'])
  },
  methods: {
    ...mapActions('memo', ['fetch_memos'])
  },
  data() {
    return {
      is_fetch_memo: false
    };
  },
  mounted() {
    this.is_fetch_memo = false;
    try {
      this.fetch_memos().then(() => {
        this.is_fetch_memo = true;
      });
    } catch (error) {
      console.log('fetch memos error');
    }
  }
};
</script>

<style>
.loader {
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  border-top: 6px solid #011d51;
  border-bottom: 6px solid #011d51;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
