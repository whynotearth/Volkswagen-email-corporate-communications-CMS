<template>
  <div class="py-6 flex-grow">
    <div class="container px-4 text-left">
      <div class="h-64 bg-brand-gradient"></div>
      <h2 class="text-primary font-bold text-xl">Rearrange the Jumpstart</h2>
      <div class="flex flex-wrap justify-between">
        <Post
          v-for="post in get_posts"
          :key="post.id"
          :post="post"
          @clicked="update_postIds(post.id)"
          :active="get_postIds.indexOf(post.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Email/Post.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { formatISODate } from '@/helpers.js';

export default {
  name: 'DraftEmail',
  components: {
    Post
  },
  validations: {
    selected_posts: {
      required
    }
  },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (!this.get_email_date) return this.$router.push({ name: 'Email', params: { step: 1 } });
    this.update_posts([]);
    this.fetch_posts({ params: { date: formatISODate(this.get_email_date) } });
  },
  methods: {
    ...mapActions('post', ['fetch_posts']),
    ...mapMutations('post', ['update_posts']),
    ...mapMutations('email', ['update_postIds'])
  },
  computed: {
    ...mapGetters('post', ['get_posts']),
    ...mapGetters('email', ['get_email_date', 'get_postIds'])
  }
};
</script>
