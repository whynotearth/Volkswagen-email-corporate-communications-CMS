<template>
  <div class="flex flex-col items-center text-center px-4 my-6">
    <div>
      <h2 class="tg-h2-mobile text-primary">Hi Xavier, here's your Jumpstart email for the day.</h2>
    </div>
    <div class="my-4 px-6">
      <EmailPreview />
    </div>
    <div>
      <h2 class="tg-h2-mobile text-primary">Daily Email will automatically send in</h2>
      <div class="counter tg-h2-mobile my-2 text-center">
        <BaseCounter date="Jan 5, 2021 15:37:25" />
      </div>
    </div>
    <div>
      <BaseButton>REVIEW AND SEND</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton';
import BaseCounter from './BaseCounter';
import EmailPreview from '@/components/Email/EmailPreview';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { formatISODate } from '@/helpers.js';

export default {
  name: 'TodaysEmail',
  components: { BaseButton, BaseCounter, EmailPreview },
  mounted() {
    this.fetch_posts({ params: { date: formatISODate(new Date()) } })
      .then(() => {
        for (let i = 0; i < this.get_posts.length; i++) {
          if (this.get_posts[i].category.name === 'Answers At A Glance') {
            this.update_selected_posts(this.get_posts[i]);
            this.update_preview_link('');
            this.debounced_preview();
            break;
          }
        }
      })
      .catch();
  },
  methods: {
    ...mapActions('email', ['debounced_preview']),
    ...mapActions('post', ['fetch_posts']),
    ...mapMutations('email', ['update_selected_posts', 'update_preview_link'])
  },
  computed: {
    ...mapGetters('post', ['get_posts'])
  }
};
</script>
