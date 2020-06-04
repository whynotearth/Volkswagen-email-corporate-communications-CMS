<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader
        :title="$v.selected_category.$model && $v.selected_category.$model.name ? 'New Post ' : 'Choose Category'"
        :to-link="{ name: 'ArticleCategorySelection' }"
      />
    </template>
    <template #content>
      <div class="min-h-full relative bg-background">
        <BaseDropdown
          class="relative bg-surface text-left container px-0 md:px-6"
          :optionContainerClasses="'dropdown-top-auto'"
          :dropdownContainerClasses="'dropdown-border-0'"
          placeholder="Choose Type"
          :options="get_categories.filter(category => category.slug !== 'community')"
          v-model="$v.selected_category.$model"
        >
          <template #title="{ selectedOption }">
            <div v-if="!get_categories.filter(category => category.slug !== 'community')">No option found</div>
            <div v-if="selectedOption && selectedOption.name" class="flex items-center">
              <div class="w-12 h-12">
                <img class="p-2" :src="selectedOption.image" alt="" />
              </div>
              <div class="flex-auto">
                <div class="w-full body-1-mobile">{{ selectedOption.name }}</div>
                <div class="w-full text-xs text-black em-disabled">{{ selectedOption.description }}</div>
              </div>
            </div>
            <div v-else>
              No category selected
            </div>
          </template>
          <template #option="{ option }">
            <a @click.prevent="selected_category = option" href="#" class="flex items-center">
              <div class="w-12 h-12">
                <img class="p-2" :src="option.image" alt="" />
              </div>
              <div class="flex-auto">
                <div class="w-full body-1-mobile">{{ option.name }}</div>
                <div class="w-full text-xs text-black em-disabled">{{ option.description }}</div>
              </div>
            </a>
          </template>
        </BaseDropdown>
        <div v-if="$v.selected_category.$model && $v.selected_category.$model.name">
          <ArticleAddStep2 ref="articleAdd" :error="validationError" />
          <ArticleAddStep3 ref="articleAdd2" :error="validationError" />
          <div class="my-6">
            <BaseButton @selectButton="submit" class="w-64" bgType="secondary"> Save </BaseButton>
          </div>
        </div>
        <div class="mt-4" v-else>Please select category to continue</div>
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseDropdown from '@/components/BaseDropdown';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import ArticleAddStep2 from '@/components/ArticleAddStep2.vue';
import ArticleAddStep3 from '@/components/ArticleAddStep3.vue';
import BaseButton from '@/components/BaseButton.vue';
import { sleep, formatISODate } from '@/helpers.js';

export default {
  name: 'AddArticle',
  components: {
    LayoutFixedScrollable,
    BaseAppBarHeader,
    BaseDropdown,
    ArticleAddStep2,
    ArticleAddStep3,
    BaseButton
  },
  validations: {
    selected_category: {
      required
    }
  },
  data() {
    return {
      validationError: false
    };
  },
  mounted() {
    this.fetch_categories();
  },
  computed: {
    ...mapGetters('article', [
      'get_categories',
      'get_date',
      'get_headline',
      'get_description',
      'get_eventDate',
      'get_image',
      'get_selected_category',
      'get_excerpt'
    ]),
    selected_category: {
      get() {
        return this.get_selected_category;
      },
      set(value) {
        this.update_selected_category(value);
      }
    }
  },
  destroyed() {
    this.update_response_message({
      message: ''
    });
  },
  methods: {
    ...mapMutations('article', ['update_response_message', 'update_selected_category']),
    ...mapActions('article', ['add_article', 'fetch_categories']),
    submit() {
      if (this.processValidation()) {
        const date_time = this.get_date ? new Date(formatISODate(this.get_date)).toISOString() : undefined;
        const event_date_time = this.get_eventDate
          ? new Date(formatISODate(this.get_eventDate)).toISOString()
          : undefined;
        const params = {
          body: {
            date: date_time,
            categorySlug: this.get_selected_category.slug,
            image: this.get_image && this.get_image.url ? this.get_image : undefined,
            headline: this.get_headline,
            description: this.get_description,
            eventDate: event_date_time,
            excerpt: this.get_excerpt
          }
        };
        this.add_article({ params })
          .then(() => {
            this.$store.dispatch('article/clear_form_data');
            this.onSuccessSubmit();
          })
          .catch(error => {
            let message = 'An error occured!';
            try {
              message = error.response.data.message;
            } catch (error) {
              //
            }

            this.update_response_message({
              message: message,
              type: 'error',
              class: 'text-error'
            });
          });
      }
    },
    processValidation() {
      this.$refs.articleAdd.$v.$touch();
      this.$refs.articleAdd2.$v.$touch();
      if (this.$refs.articleAdd.$v.$invalid || this.$refs.articleAdd2.$v.$invalid) {
        this.validationError = true;
        return false;
      }
      return true;
    },
    async onSuccessSubmit() {
      // TODO: refactor, rename and move to helpers
      this.$store.commit('overlay/updateModel', {
        title: 'Success!',
        message: ''
      });

      await sleep(1000);

      await this.$router.push({
        name: 'Dashboard'
      });

      this.$store.commit('overlay/updateModel', {
        title: '',
        message: ''
      });
    }
  }
};
</script>
