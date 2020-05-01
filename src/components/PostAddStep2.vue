<template>
  <div class="py-6 flex-grow">
    <div class="container px-4 md:px-6 text-left">
      <BaseInputText
        class="bg-surface mb-4"
        v-model="$v.headline.$model"
        label="Headline"
        placeholder="Headline"
        :error="$v.headline.$dirty && $v.headline.$invalid"
      >
        <span v-if="$v.headline.$dirty && !$v.headline.required" class="text-xs text-error">
          Headline is required
        </span>
        <span v-if="$v.headline.$dirty && !$v.headline.maxLength" class="text-xs text-error">
          Headline should be less than 80 characters
        </span>
      </BaseInputText>

      <BaseInputTextarea
        class="body-1-mobile bg-surface"
        v-model="$v.description.$model"
        label="Description"
        placeholder="Put the content of your post here."
        :error="$v.description.$dirty && $v.description.$invalid"
      >
        <span v-if="$v.description.$dirty && !$v.description.required" class="text-xs text-error">
          Description is required
        </span>
        <span v-if="$v.description.$dirty && !$v.description.maxLength" class="text-xs text-error">
          Description should be less than 750 characters
        </span>
      </BaseInputTextarea>

      <BaseInputText
        class="bg-surface mb-4"
        v-model="$v.price.$model"
        label="Price"
        placeholder="Price"
        :error="$v.price.$dirty && $v.price.$invalid"
      >
        <span v-if="$v.price.$dirty && !$v.price.required" class="text-xs text-error">
          Price is required
        </span>
        <span v-if="$v.price.$dirty && !$v.price.decimal" class="text-xs text-error">
          Price is not a valid number
        </span>
      </BaseInputText>

      <BaseInputText
        class="bg-surface mb-4"
        v-model="$v.eventDate.$model"
        label="Date/Time"
        placeholder="20 March, 2020, 7:00 PM"
        :error="$v.eventDate.$dirty && $v.eventDate.$invalid"
      >
        <span v-if="$v.eventDate.$dirty && !$v.eventDate.required" class="text-xs text-error">
          Date/Time is required
        </span>
      </BaseInputText>
    </div>
  </div>
</template>

<script>
import BaseInputText from '@/components/BaseInputText.vue';
import BaseInputTextarea from '@/components/BaseInputTextarea.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required, decimal, maxLength, requiredIf } from 'vuelidate/lib/validators';
const CATEGORY_EVENT = 111;

export default {
  name: 'PostAddStep2',
  components: { BaseInputText, BaseInputTextarea },
  validations: {
    headline: {
      required,
      maxLength: maxLength(80)
    },
    description: {
      required,
      maxLength: maxLength(750)
    },
    price: {
      required,
      decimal
    },
    date: {
      required
    },
    eventDate: {
      required: requiredIf(function(context) {
        return context.get_categoryId === CATEGORY_EVENT;
      })
    }
  },
  mounted() {
    this.fetch_categories();
  },
  methods: {
    ...mapActions('post', ['fetch_categories']),
    ...mapMutations('post', [
      'update_headline',
      'update_description',
      'update_date',
      'update_price',
      'update_eventDate',
      'update_images'
    ])
  },
  computed: {
    ...mapGetters('post', [
      'get_headline',
      'get_description',
      'get_date',
      'get_price',
      'get_eventDate',
      'get_images',
      'get_categoryId',
      'get_categories'
    ]),
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
    date: {
      get() {
        return this.get_date;
      },
      set(value) {
        this.update_date(value);
      }
    },
    price: {
      get() {
        return this.get_price;
      },
      set(value) {
        this.update_price(value);
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
        return this.get_images;
      },
      set(value) {
        this.update_images(value);
      }
    }
  }
};
</script>

<style scoped>
.text-gray {
  color: rgba(0, 0, 0, 0.38);
}
.active {
  background: rgba(3, 179, 249, 0.12);
}
</style>
