<template>
  <div class="flex-grow">
    <div class="container px-4 text-left">
      <div class="bg-brand-gradient h-full p-8 -mx-4 md:m-0">
        <div class="mx-auto max-w-sm">
          <img v-if="get_preview_link" :src="get_preview_link" />
          <Logo v-else class="mx-auto" />
        </div>
      </div>
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
        <span v-if="$v.get_postIds.$error" class="text-xs text-error">
          Please select atleast one post.
        </span>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <Post
            v-for="post in get_posts"
            :key="post.id"
            :post="post"
            @clicked="addPost(post.id)"
            :active="isActive(post.id)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Email/Post.vue';
import Logo from '@/assets/white_logo.svg';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { debounce } from 'lodash-es';

export default {
  name: 'DraftEmail',
  components: {
    Post,
    Logo
  },
  validations: {
    get_postIds: {
      required
    }
  },
  mounted() {
    if (!this.get_email_date) return this.$router.push({ name: 'EmailsAdd', params: { step: 1 } });
  },
  methods: {
    ...mapMutations('email', ['update_postIds', 'update_preview_link']),
    debounced_preview: debounce(
      function() {
        this.update_preview_link();
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
    ...mapGetters('email', ['get_email_date', 'get_postIds', 'get_preview_link'])
  }
};
</script>
