<template>
  <div class="py-2 flex-grow">
    <div class="container px-4 md:px-6 text-left">
      <BaseInputText
        v-if="isFieldVisible('headline')"
        class="bg-surface mb-4"
        v-model="$v.headline.$model"
        :label="stringHeadlineByCategoryName"
        :placeholder="stringHeadlineByCategoryName"
        :error="$v.headline.$dirty && $v.headline.$invalid"
        :model="$v.headline"
      >
        <span v-if="$v.headline.$dirty && !$v.headline.required" class="text-xs text-error pl-error-message">
          {{ stringHeadlineByCategoryName }} is required
        </span>
        <span v-if="$v.headline.$dirty && !$v.headline.maxLength" class="text-xs text-error pl-error-message">
          {{ stringHeadlineByCategoryName }} should be less than 80 characters
        </span>
      </BaseInputText>

      <hr v-if="isFieldVisible('image')" class="my-4 bg-background border-black em-low -mx-4 sm:mx-0 mb-4" />
      <ImageUpload v-if="isFieldVisible('image')" v-model="images" :defaultImages="images" />

      <BaseInputTextArea
        v-if="isFieldVisible('excerpt') && !isImagesEmpty"
        class="bg-surface my-4"
        v-model="$v.excerpt.$model"
        label="Excerpt"
        placeholder="Excerpt"
        :error="$v.excerpt.$dirty && $v.excerpt.$invalid"
        :model="$v.excerpt"
      >
        <span v-if="$v.excerpt.$dirty && !$v.excerpt.required" class="text-xs text-error pl-error-message">
          Excerpt is required
        </span>
        <span v-if="$v.excerpt.$dirty && !$v.excerpt.maxLength" class="text-xs text-error pl-error-message">
          Excerpt should be less than 175 characters
        </span>
      </BaseInputTextArea>

      <hr class="my-4 bg-background border-black em-low -mx-4 sm:mx-0 mb-4" />

      <BaseEditor
        class="mt-6 mb-4 body-1-mobile bg-surface"
        :error="
          $v.description.$dirty && ($v.description.$invalid || !$v.description.required || !$v.description.maxLength)
        "
        :placeholder="isAnswersCategory ? stringDescriptionByCategoryName : 'Put the content of your article here.'"
        v-if="isFieldVisible('description')"
        v-model="$v.description.$model"
        :model="$v.description"
      >
        <span v-if="$v.description.$dirty && !$v.description.required" class="text-xs text-error pl-error-message">
          {{ stringDescriptionByCategoryName }} is required
        </span>
        <span v-if="$v.description.$dirty && !$v.description.maxLength" class="text-xs text-error pl-error-message">
          {{ stringDescriptionByCategoryName }} should be less than 750 characters
        </span>
      </BaseEditor>

      <BaseInputText
        v-if="isFieldVisible('eventDate')"
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
          Date/Time is invalid. Example: 2020-12-24 7:30 pm
        </span>
      </BaseInputText>
    </div>
  </div>
</template>

<script>
import BaseInputText from '@/components/BaseInputText.vue';
import BaseInputTextArea from '@/components/BaseInputTextarea.vue';
import BaseEditor from '@/components/Editor/BaseEditor.vue';
import ImageUpload from '@/components/ImageUpload/ImageUpload.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required, decimal, maxLength, requiredIf } from 'vuelidate/lib/validators';
import { mustBeDate } from '@/validations.js';

// Answers at a glance, One Team: Headline, Description
// Event: Headline, Description, Price, Date/Time, Image
// Plant, Priority, People, Community: Headline, Description, Image

export default {
  name: 'ArticleAddStep2',
  components: {
    BaseInputText,
    BaseEditor,
    ImageUpload,
    BaseInputTextArea
  },
  validations() {
    return {
      headline: {
        required: requiredIf(context => {
          return context.isFieldVisible('headline');
        }),
        maxLength: maxLength(80)
      },
      description: {
        required: requiredIf(context => {
          return context.isFieldVisible('description');
        }),
        maxLength: maxLength(this.descriptionMaxLength)
      },
      eventDate: {
        mustBeDate: value => mustBeDate({ value })
      },
      excerpt: {
        required: requiredIf(context => {
          return context.isFieldVisible('headline') && !this.isImagesEmpty;
        }),
        maxLength: maxLength(175)
      }
    };
  },
  mounted() {
    this.fetch_categories();
  },
  methods: {
    ...mapActions('article', ['fetch_categories']),
    ...mapMutations('article', [
      'update_headline',
      'update_description',
      'update_date',
      'update_eventDate',
      'update_image',
      'update_excerpt'
    ]),
    isFieldVisible(fieldName) {
      const categoryName = this.get_selected_category.name;
      let isVisible = false;
      switch (categoryName) {
        case 'Events':
          isVisible = ['headline', 'description', 'eventDate', 'image', 'excerpt'].includes(fieldName);
          break;
        case 'One Team':
        case 'Answers At A Glance':
          isVisible = ['headline', 'description', 'excerpt'].includes(fieldName);
          break;
        case 'Priority':
        case 'People':
        case 'Community':
        case 'Plant':
          isVisible = ['headline', 'description', 'image', 'excerpt'].includes(fieldName);
          break;

        default:
          break;
      }
      return isVisible;
    }
  },
  computed: {
    ...mapGetters('article', [
      'get_headline',
      'get_description',
      'get_eventDate',
      'get_image',
      'get_selected_category',
      'get_categories',
      'get_excerpt'
    ]),
    isAnswersCategory() {
      return this.get_selected_category.slug === 'answers-at-a-glance';
    },
    stringHeadlineByCategoryName() {
      return this.isAnswersCategory ? 'Question' : 'Headline';
    },
    stringDescriptionByCategoryName() {
      return this.isAnswersCategory ? 'Answer' : 'Description';
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
    excerpt: {
      get() {
        return this.get_excerpt;
      },
      set(value) {
        this.update_excerpt(value);
      }
    },
    isImagesEmpty() {
      return this.images.some(image => {
        return Object.keys(image).length === 0 && image.constructor === Object;
      });
    },
    descriptionMaxLength() {
      return this.isImagesEmpty ? 650 : 450;
    }
  }
};
</script>
