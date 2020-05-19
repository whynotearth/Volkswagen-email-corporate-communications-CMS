<template>
  <LayoutFixedScrollable>
    <template #content>
      <div>
        <BaseAppBarHeader
          class="sticky top-0 bg-white"
          title="Rearrange Blue Delta "
          :to-link="{ name: 'EditBlueDelta', params: { id: id } }"
        />
        <div class="flex mb-40">
          <div class="flex-grow">
            <div class="container px-4 text-left h-full">
              <div class="my-4 w-full">
                <EmailPreview @error="$v.$touch()" />
              </div>
              <h2 class="text-primary font-bold text-xl">Rearrange the Jumpstart</h2>
              <span v-if="$v.get_selected_articles.$error" class="text-xs text-error">
                Please select atleast one article.
              </span>
              <div class="md:px-12 py-4 text-center">
                <BaseButton @selectButton="updateBlueDelta" class="w-full sm:w-1/2" bgType="secondary">Save</BaseButton>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <Article
                  v-for="(article, index) in get_available_articles"
                  :key="index"
                  :article="article"
                  @clicked="selectArticle(article)"
                  :active="isActive(article)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import Article from '@/components/Email/Article.vue';
import EmailPreview from '@/components/Email/EmailPreview.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import NavigationBottom from '@/components/BaseNavigationBottom';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { formatISODate, formatDate, sleep } from '@/helpers.js';

export default {
  name: 'DraftEmail',
  components: { Article, BaseButton, EmailPreview, LayoutFixedScrollable, BaseAppBarHeader, NavigationBottom },
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
    if (!this.id || this.get_selected_articles.length === 0) this.$router.push({ name: 'JumpStartLists' });
    this.update_preview_link();
  },
  methods: {
    ...mapMutations('email', ['update_response_message']),
    ...mapActions('email', [
      'debounced_preview',
      'update_preview_link',
      'create_jumpstart',
      'update_selected_articles',
      'update_available_articles',
      'clear_email_data'
    ]),
    formatDate,
    formatISODate,
    selectArticle(article) {
      if (this.get_selected_articles.length >= 5 && this.isActive(article) === -1) return false;
      this.$v.$reset();
      this.update_selected_articles(article);
      this.update_preview_link('');
      this.debounced_preview();
    },
    isActive(article) {
      return this.get_selected_articles.indexOf(article);
    },
    updateBlueDelta() {
      this.$v.$touch();
      if (this.$v.$invalid) return false;
      let d = new Date(this.get_email_date);
      d.setHours(0, 0, 0, 0);
      let total_time = new Date(d.getTime() + this.get_schedule_time).toISOString();
      const params = {
        body: {
          id: this.id,
          articleIds: this.get_selected_articles.map(article => article.id),
          dateTime: this.get_schedule_time ? total_time : this.get_email_date,
          distributionGroups: this.get_email_recipients
        }
      };
      this.create_jumpstart({ params })
        .then(() => {
          this.clear_email_data();
          this.onSuccessSubmit();
        })
        .catch(error => {
          this.update_response_message({
            message: error.response.data.message,
            type: 'error',
            class: 'text-error'
          });
        });
    },
    async onSuccessSubmit() {
      this.$store.commit('overlay/updateModel', {
        title: 'Success!',
        message: ''
      });

      await sleep(1000);

      await this.$router.push({
        name: 'JumpStartLists'
      });

      this.$store.commit('overlay/updateModel', {
        title: '',
        message: ''
      });
    }
  },
  computed: {
    ...mapGetters('email', [
      'get_email_date',
      'get_schedule_time',
      'get_selected_articles',
      'get_email_recipients',
      'get_available_articles'
    ])
  }
};
</script>
