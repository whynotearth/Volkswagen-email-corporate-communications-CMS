<template>
  <div class="flex-grow">
    <div class="container px-4 text-left h-full">
      <EmailPreview @error="$v.$touch()" />
      <h2 class="text-primary font-bold text-xl">Rearrange the Jumpstart</h2>
      <span v-if="$v.get_selected_articles.$error" class="text-xs text-error">
        Please select atleast one article.
      </span>
      <div class="px-12 py-4">
        <BaseButton @click="updateBlueDelta" classes="w-full sm:w-1/2" bg-type="secondary">Save</BaseButton>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <Article
          v-for="article in get_all_articles"
          :key="article.id"
          :article="article"
          @clicked="selectArticle(article)"
          :active="isActive(article)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Article from '@/components/Email/Article.vue';
import EmailPreview from '@/components/Email/EmailPreview.vue';
import BaseButton from '@/components/BaseButton.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { formatISODate, formatDate } from '@/helpers.js';

export default {
  name: 'DraftEmail',
  components: { Article, BaseButton, EmailPreview },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  validations: {
    get_selected_articles: {
      required
    }
  },
  mounted() {
    this.fetch_available_articles({ jumpStartId: this.id });
    this.update_preview_link();
  },
  methods: {
    ...mapActions('email', [
      'debounced_preview',
      'update_preview_link',
      'create_jumpstart',
      'update_selected_articles',
      'fetch_available_articles',
      'update_available_articles'
    ]),
    formatDate,
    formatISODate,
    selectArticle(article) {
      if (this.get_selected_articles.length >= 5 && this.isActive(article) === -1) return false;
      this.$v.$reset();
      this.update_selected_articles(article);
      this.update_available_articles(article);
      this.update_preview_link('');
      this.debounced_preview();
    },
    isActive(article) {
      return this.get_selected_articles.indexOf(article);
    },
    updateBlueDelta() {
      let total_time = new Date(this.get_email_date + this.get_schedule_time).toISOString();
      const params = {
        jumpStartId: this.id,
        body: {
          dateTime: total_time,
          articleIds: this.get_selected_articles.map(article => article.id),
          distributionGroups: this.get_email_recipients
        }
      };
      this.create_jumpstart({ params }).catch(error => {
        this.update_response_message({
          message: error.response.data.message,
          type: 'error',
          class: 'text-error'
        });
      });
    }
  },
  computed: {
    ...mapGetters('email', [
      'get_email_date',
      'get_schedule_time',
      'get_selected_articles',
      'get_available_articles',
      'get_selected_jumpstart'
    ]),
    get_all_articles() {
      return [...this.get_selected_articles, ...this.get_available_articles];
    }
  }
};
</script>
