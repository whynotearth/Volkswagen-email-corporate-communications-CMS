<template>
  <div class="py-6 flex-grow">
    <div class="container px-4 text-left">
      <div class="bg-brand-gradient h-full p-8">
        <div class="mx-auto max-w-sm">
          <img v-if="previewLink.length > 0" :src="previewLink" />
          <Logo v-else class="mx-auto" />
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
import Logo from '@/assets/white_logo.svg';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { formatISODate } from '@/helpers.js';
import { debounce } from 'lodash-es';
import { BASE_API } from '@/connection/api.js';

export default {
  name: 'DraftEmail',
  data: () => ({ previewLink: '' }),
  components: {
    Post,
    Logo
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
    this.debounced_preview();
  },
  methods: {
    ...mapActions('post', ['fetch_posts']),
    ...mapMutations('email', ['update_postIds']),
    updatePreviewLink() {
      const base = `${BASE_API}/api/v0/volkswagen/jumpstart/preview`;
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
    ...mapGetters('email', ['get_email_date', 'get_postIds'])
  }
};
</script>
