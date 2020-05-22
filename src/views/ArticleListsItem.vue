<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="get_headline" :to-link="{ name: 'ArticleLists' }" />
    </template>
    <template #content>
      <div class="flex-grow">
        <div v-if="selectedArticle.id" class="container px-0 py-6 text-left">
          <div class="px-4 md:px-6 md:pb-4">
            <div class="flex items-center pb-5 bg-surface">
              <div class="w-8 h-8">
                <img :src="selectedArticle.category.image" alt="" />
              </div>
              <div class="flex-auto pl-4">
                <div class="w-full body-1-mobile">{{ selectedArticle.category.name }}</div>
                <div class="w-full text-xs text-black em-disabled">{{ selectedArticle.category.description }}</div>
              </div>
            </div>
            <BaseInputText
              v-if="isFieldRequired('headline')"
              class="bg-surface mb-4"
              v-model="$v.headline.$model"
              :label="stringHeadlineByCategoryName"
              :placeholder="stringHeadlineByCategoryName"
              :error="$v.headline.$dirty && $v.headline.$invalid"
            >
              <span v-if="$v.headline.$dirty && !$v.headline.required" class="text-xs text-error pl-error-message">
                {{ stringHeadlineByCategoryName }} is required
              </span>
              <span v-if="$v.headline.$dirty && !$v.headline.maxLength" class="text-xs text-error pl-error-message">
                {{ stringHeadlineByCategoryName }} should be less than 80 characters
              </span>
            </BaseInputText>

            <BaseEditor
              v-if="isFieldRequired('description')"
              class="body-1-mobile bg-surface mb-4"
              v-model="$v.description.$model"
              :label="stringDescriptionByCategoryName"
              :placeholder="
                isAnswersCategory ? stringDescriptionByCategoryName : 'Put the content of your article here.'
              "
              :error="$v.description.$dirty && $v.description.$invalid"
            >
              <span
                v-if="$v.description.$dirty && !$v.description.required"
                class="text-xs text-error pl-error-message"
              >
                {{ stringDescriptionByCategoryName }} is required
              </span>
              <span
                v-if="$v.description.$dirty && !$v.description.maxLength"
                class="text-xs text-error pl-error-message"
              >
                {{ stringDescriptionByCategoryName }} should be less than 750 characters
              </span>
            </BaseEditor>

            <BaseInputText
              v-if="isFieldRequired('eventDate')"
              class="bg-surface mb-4"
              v-model="$v.eventDate.$model"
              label="Date/Time"
              placeholder="20 March, 2020, 7:00 PM"
              :error="$v.eventDate.$dirty && $v.eventDate.$invalid"
            >
              <span v-if="$v.eventDate.$dirty && !$v.eventDate.required" class="text-xs text-error pl-error-message">
                Date/Time is required
              </span>
              <span v-if="$v.eventDate.$dirty && !$v.eventDate.mustBeDate" class="text-xs text-error pl-error-message">
                Date/Time is invalid. Example: 20 March, 2020, 7:30 pm
              </span>
            </BaseInputText>
          </div>

          <hr v-if="isFieldRequired('image')" class="bg-background border-black em-low -mx-4 sm:mx-0 mb-4" />
          <ImageUpload v-if="isFieldRequired('image')" class="px-4 md:px-6" v-model="images" :defaultImages="images" />

          <hr class="border-divider w-auto mt-5 md:mx-6" />
          <BaseDropdown
            class="relative bg-surface"
            placeholder="Schedule time"
            :options="dates"
            v-model="$v.date.$model"
          >
            <template #title="{ selectedOption }">
              Schedule
              <span v-if="dates.length === 0" class="text-gray-500">
                No time slots!
              </span>
              <span v-else-if="selectedOption" class="ml-2 em-medium text-black">
                {{ formatDate(selectedOption) }}
              </span>
            </template>
            <template #option="{ option }">
              <span>
                {{ formatDate(option) }}
              </span>
            </template>
          </BaseDropdown>

          <div class="px-4 md:px-6">
            <p v-if="get_response_message.message" class="font-bold px-4 mb-4" :class="get_response_message.class">
              {{ get_response_message.message }}
            </p>

            <div
              class="block text-center bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2
           px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100
           ease-in-out transition-all label-mobile my-6 cursor-pointer mt-16 md:w-1/3 m-auto"
              @click="submit()"
            >
              Save
            </div>
            <div
              class="block text-center m-auto text-error font-bold label-mobile my-6 w-16
           cursor-pointer"
              @click="deleteItem()"
            >
              DELETE
            </div>
          </div>
        </div>
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseInputText from '@/components/BaseInputText.vue';
import BaseEditor from '@/components/Editor/BaseEditor.vue';
import BaseDropdown from '@/components/BaseDropdown';
import ImageUpload from '@/components/ImageUpload/ImageUpload.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required, decimal, maxLength, requiredIf } from 'vuelidate/lib/validators';
import { mustBeDate } from '@/validations.js';
import { formatISODate, formatDate } from '@/helpers.js';
import { get } from 'lodash-es';

export default {
  name: 'ArticleListsItem',
  components: {
    LayoutFixedScrollable,
    BaseAppBarHeader,
    BaseInputText,
    BaseEditor,
    BaseDropdown,
    ImageUpload
  },
  validations: {
    headline: {
      required: requiredIf(context => {
        return context.isFieldRequired('headline');
      }),
      maxLength: maxLength(80)
    },
    description: {
      required: requiredIf(context => {
        return context.isFieldRequired('description');
      }),
      maxLength: maxLength(750)
    },
    eventDate: {
      mustBeDate: value => mustBeDate({ value })
    },
    date: {
      mustBeDate: value => mustBeDate({ value })
    }
  },
  computed: {
    ...mapGetters('article', [
      'get_headline',
      'get_description',
      'get_eventDate',
      'get_articles',
      'get_response_message',
      'get_date',
      'get_image'
    ]),
    ...mapGetters('email', ['get_daily_plan']),
    isAnswersCategory() {
      return this.selectedArticle.category.slug === 'answers-at-a-glance';
    },
    stringHeadlineByCategoryName() {
      return this.isAnswersCategory ? 'Question' : 'Headline';
    },
    stringDescriptionByCategoryName() {
      return this.isAnswersCategory ? 'Answer' : 'Description';
    },
    articleId() {
      return parseInt(this.$route.params.id);
    },
    headline: {
      get() {
        return this.get_headline;
      },
      set(value) {
        this.update_headline(value);
      }
    },
    description: {
      get() {
        return this.get_description;
      },
      set(value) {
        this.update_description(value);
      }
    },
    eventDate: {
      get() {
        return this.get_eventDate;
      },
      set(value) {
        this.update_eventDate(value);
      }
    },
    date: {
      get() {
        return this.get_date;
      },
      set(value) {
        this.update_date(value);
      }
    },
    images: {
      get() {
        return [this.get_image];
      },
      set(value) {
        let image = {};
        try {
          image = value[0];
        } catch (error) {}
        this.update_image(image);
      }
    },
    dates() {
      let d = new Date();
      let dtzOffset = d.getTimezoneOffset() * 60000;
      d.setHours(0, 0, 0, 0);
      d = d.getTime();
      let days = [];
      for (let i = 0; i < 30; i++) {
        let a = d - dtzOffset + i * 86400000;
        days.push(new Date(a));
      }
      return days;
    },
    selectedArticle() {
      let articles = [];
      this.get_daily_plan.forEach(item => {
        articles = [...articles, ...item.articles];
      });
      return articles.find(item => {
        return item.id === this.articleId;
      });
    }
  },
  mounted() {
    this.initialForm();
  },
  destroyed() {
    this.$store.dispatch('article/clear_form_data');
    this.update_response_message({
      message: ''
    });
  },
  methods: {
    ...mapActions('article', ['put_article', 'delete_article']),
    ...mapActions('email', ['fetch_daily_plan']),
    ...mapMutations('article', [
      'update_headline',
      'update_description',
      'update_date',
      'update_eventDate',
      'update_date',
      'update_response_message',
      'update_image'
    ]),
    formatDate,
    initialForm() {
      this.update_headline(this.selectedArticle.headline);
      this.update_description(this.selectedArticle.description);
      this.update_date(this.selectedArticle.date);
      this.update_eventDate(formatDate(this.selectedArticle.eventDate));
      this.update_date(formatDate(this.selectedArticle.date));
    },
    isFieldRequired(fieldName) {
      if (!this.selectedArticle) {
        return false;
      }
      const categoryName = this.selectedArticle.category.name;
      let isRequired = false;
      switch (categoryName) {
        case 'Events':
          isRequired = ['headline', 'description', 'eventDate', 'image', 'date'].includes(fieldName);
          break;
        case 'One Team':
        case 'Answers At A Glance':
          isRequired = ['headline', 'description', 'date'].includes(fieldName);
          break;
        case 'Priority':
        case 'People':
        case 'Community':
        case 'Plant':
          isRequired = ['headline', 'description', 'image', 'date'].includes(fieldName);
          break;

        default:
          break;
      }
      return isRequired;
    },
    submit() {
      const date_time = this.get_date ? formatISODate(this.get_date) : undefined;
      const event_date_time = this.get_eventDate ? formatISODate(this.get_eventDate) : undefined;
      const data = {
        articleId: this.articleId,
        body: {
          date: date_time,
          categorySlug: this.selectedArticle.category.slug,
          image: this.get_image && this.get_image.url ? this.get_image : undefined,
          headline: this.get_headline,
          description: this.get_description,
          eventDate: event_date_time,
        }
      };
      this.put_article(data)
        .then(() => {
          this.$router.push({ name: 'ArticleLists' });
          this.$store.dispatch('article/clear_form_data');
        })
        .catch(error => {
          let message = 'An error occured!';
          try {
            message = error.response.data.message;
          } catch (error) {
            message = 'Unknown error!';
          }

          this.update_response_message({
            message: message,
            type: 'error',
            class: 'text-error'
          });
        });
    },
    deleteItem() {
      if (confirm('Are you sure?')) {
        const data = {
          articleId: this.articleId
        };
        this.delete_article(data)
          .then(() => {
            this.$router.push({ name: 'ArticleLists' });
          })
          .catch(error => {
            let message = 'An error occured!';
            try {
              message = error.response.data.message;
            } catch (error) {
              message = 'Unknown error!';
            }

            this.update_response_message({
              message: message,
              type: 'error',
              class: 'text-error'
            });
          });
      }
    }
  }
};
</script>
