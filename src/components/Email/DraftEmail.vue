<template>
  <div class="py-6 flex-grow">
    <div class="container px-4 text-left">
      <div class="bg-brand-gradient h-full p-8">
        <div class="bg-white mx-auto max-w-sm">
          <!-- https://stagingapi.whynot.earth/api/v0/volkswagen/jumpstart/preview?postIds=25&postIds=26&postIds=27 -->
          <img :src="previewLink" />
        </div>
      </div>
      <h2 class="text-primary font-bold text-xl">Rearrange the Jumpstart</h2>
      <div class="flex flex-wrap justify-between">
        <Post
          v-for="post in get_posts"
          :key="post.id"
          :post="post"
          @clicked="addPost(post.id)"
          :active="isActive(post.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Email/Post.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { formatISODate } from '@/helpers.js';
import { debounce } from 'lodash-es';

export default {
  name: 'DraftEmail',
  data: () => ({ previewLink: '' }),
  components: {
    Post
  },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (!this.get_email_date) return this.$router.push({ name: 'Email', params: { step: 1 } });
    this.fetch_posts({ params: { date: formatISODate(this.get_email_date) } });
  },
  methods: {
    ...mapActions('post', ['fetch_posts']),
    ...mapMutations('email', ['update_postIds']),
    updatePreviewLink() {
      const base = 'https://stagingapi.whynot.earth/api/v0/volkswagen/jumpstart/preview';
      const url = new URL(base);

      this.get_postIds.forEach(postId => {
        url.searchParams.append('postIds', postId);
      });
      this.previewLink = url.href;
    },
    debounced_preview: debounce(
      function() {
        this.updatePreviewLink();
      },
      3000,
      { maxWait: 3000 }
    ),
    addPost(post) {
      if (this.get_postIds.length < 6) {
        this.update_postIds(post);
        this.debounced_preview();
      }
    },
    isActive(id) {
      return this.get_postIds.indexOf(id);
    }
  },
  computed: {
    ...mapGetters('post', ['get_posts']),
    ...mapGetters('email', ['get_email_date', 'get_postIds', 'get_preview'])
  }
};
</script>
