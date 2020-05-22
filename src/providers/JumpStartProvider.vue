<template>
  <div class="h-screen">
    <slot v-bind="{ list, pageInfo }" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

/*
  When you put here jumpstart logic it will work perfectly if they share same component.
  It should has same data object as MemoList to make this work done.
  And you can customize it by sending info via pageInfo and use it at ActivityList.vue
  For MemoList it's ready you can use it like ActivityFeedJumpStartList.vue 
  Only difference will be importing MemoProvider.
  I won't touch MemoList, maybe you won't like using of this, so I'll leave decision to you.

  You can find tutorial about Provider / Consumer pattern on the link below.

  https://learn-vuejs.github.io/vue-patterns/patterns/#provider-consumer
*/

export default {
  data() {
    return {
      pageInfo: {
        title: 'Jump Start',
        backRoute: '/',
        listItemDetailPath: 'ActivityFeedJumpStartItem'
      }
    };
  },
  computed: {
    ...mapGetters('memo', {
      list: 'get_memos'
    })
  },
  methods: {
    ...mapActions('memo', ['fetch_memos'])
  },
  mounted() {
    this.fetch_memos();
  }
};
</script>
