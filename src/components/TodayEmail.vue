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
        <BaseCounter :date="formatDate(get_selected_jumpstart.dateTime, 'MMM d, yyyy h:mm aaa')" />
      </div>
    </div>
    <div>
      <BaseButton @selectButton="selectButton">REVIEW AND SEND</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton';
import BaseCounter from './BaseCounter';
import EmailPreview from '@/components/Email/EmailPreview';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { formatISODate, formatDate } from '@/helpers.js';

export default {
  name: 'TodaysEmail',
  components: { BaseButton, BaseCounter, EmailPreview },
  mounted() {
    this.fetch_jumpstarts()
      .then(() => {
        let article, i;
        this.update_selected_jumpstart(this.get_jumpstarts[0]);
        for (i = 0; i < 5; i++) {
          article = this.get_selected_jumpstart.articles[i];
          if (article) this.update_selected_articles(article);
          else break;
        }
        this.debounced_preview();
      })
      .catch();
  },
  methods: {
    ...mapActions('email', ['debounced_preview', 'fetch_jumpstarts', 'update_selected_articles']),
    ...mapMutations('email', ['update_selected_jumpstart', 'update_preview_link']),
    formatDate,
    selectButton() {
      debugger;
      this.$router.push({ name: 'EditBlueDelta', params: { id: this.get_selected_jumpstart.id } });
    }
  },
  computed: {
    ...mapGetters('email', ['get_jumpstarts', 'get_selected_jumpstart'])
  }
};
</script>
