<template>
  <div class="py-6 flex-grow">
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

      <BaseEditor
        class="mb-4 body-1-mobile bg-surface"
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

      <hr v-if="isFieldVisible('image')" class="bg-background border-black em-low -mx-4 sm:mx-0 mb-4" />
      <ImageUpload v-if="isFieldVisible('image')" v-model="images" :defaultImages="images" />
    </div>
  </div>
</template>

<script>
import BaseInputText from '@/components/BaseInputText.vue';
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
    ImageUpload
  },
  validations: {
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
      maxLength: maxLength(750)
    },
    eventDate: {
      mustBeDate: value => mustBeDate({ value })
    }
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
      'update_image'
    ]),
    isFieldVisible(fieldName) {
      const categoryName = this.get_selected_category.name;
      let isVisible = false;
      switch (categoryName) {
        case 'Events':
          isVisible = ['headline', 'description', 'eventDate', 'image'].includes(fieldName);
          break;
        case 'One Team':
        case 'Answers At A Glance':
          isVisible = ['headline', 'description'].includes(fieldName);
          break;
        case 'Priority':
        case 'People':
        case 'Community':
        case 'Plant':
          isVisible = ['headline', 'description', 'image'].includes(fieldName);
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
      'get_categories'
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
    }
  }
};
</script>
