<template>
  <div class="py-6 flex-grow">
    <div class="container px-4 text-left">
      <div class="bg-brand-gradient h-full p-8">
        <img :src="`data:image/jpeg;base64,${get_preview}`" class="bg-white h-64 mx-auto w-40" />
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
    this.fetch_preview({ params: { postIds: this.get_postIds } });
  },
  methods: {
    ...mapActions('post', ['fetch_posts']),
    ...mapActions('email', ['fetch_preview']),
    ...mapMutations('email', ['update_postIds']),
    debounced_preview: debounce(
      function() {
        this.fetch_preview({ params: { postIds: [...this.get_postIds] } });
      },
      350,
      { maxWait: 1000 }
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
