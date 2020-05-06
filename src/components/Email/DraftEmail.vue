<template>
  <div class="flex-grow">
    <div class="container px-4 text-left h-full">
      <EmailPreview @error="$v.$touch()" />
      <h2 class="text-primary font-bold text-xl">Rearrange the Jumpstart</h2>
      <template v-if="get_posts.length === 0">
        <span class="block my-2">
          No posts available!
          <br />
          Click
          <router-link :to="{ name: 'PostAdd', params: { step: 1 } }" class="text-secondary underline">
            here
          </router-link>
          to create one
        </span>
      </template>
      <template v-else>
        <span v-if="$v.get_selected_posts.$error" class="text-xs text-error">
          Please select atleast one post.
        </span>
        <span
          v-else-if="!get_selected_posts.some(post => post.category.slug === 'answers-at-a-glance')"
          class="text-xs text-error"
        >
          Selecting an "answers at a glance" post is required.
        </span>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <Post
            v-for="post in get_posts"
            :key="post.id"
            :post="post"
            @clicked="addPost(post)"
            :active="isActive(post)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Email/Post.vue';
import EmailPreview from '@/components/Email/EmailPreview.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'DraftEmail',
  components: { Post, EmailPreview },
  validations: {
    get_selected_posts: {
      required
    }
  },
  mounted() {
    if (!this.get_email_date) return this.$router.push({ name: 'EmailsAdd', params: { step: 1 } });
  },
  methods: {
    ...mapActions('email', ['debounced_preview']),
    ...mapMutations('email', ['update_selected_posts', 'update_preview_link']),
    addPost(post) {
      if (this.get_selected_posts.length < 6) {
        this.$v.$reset();
        this.update_selected_posts(post);
        this.update_preview_link('');
        this.debounced_preview();
      }
    },
    isActive(post) {
      return this.get_selected_posts.indexOf(post);
    }
  },
  computed: {
    ...mapGetters('post', ['get_posts']),
    ...mapGetters('email', ['get_email_date', 'get_selected_posts'])
  }
};
</script>
