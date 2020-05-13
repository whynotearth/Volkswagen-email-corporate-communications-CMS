<template>
  <div class="py-6 flex-grow">
    <div class="container px-0 md:px-4 text-left">
      <p v-if="$v.$invalid" v-show="error" class="font-bold text-error px-4 mb-4">
        Please select a category.
      </p>

      <ul class="list-none bg-background">
        <!-- TODO: ENABLE COMMUNITY -->
        <li
          v-for="(category, index) in get_categories.filter(category => category.slug !== 'community')"
          :key="index"
          class="text-left py-1 px-2"
          :class="{ active: category.slug === get_selected_category.slug }"
        >
          <a @click.prevent="selected_category = category" href="#" class="flex items-center">
            <div class="w-12 h-12">
              <img class="p-2" :src="category.image" alt="" />
            </div>
            <div class="flex-auto">
              <div class="w-full body-1-mobile">{{ category.name }}</div>
              <div class="w-full text-xs text-black em-disabled">{{ category.description }}</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'ArticleAddStep1',
  validations: {
    selected_category: {
      required
    }
  },
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.fetch_categories();
  },
  methods: {
    ...mapMutations('article', ['update_selected_category']),
    ...mapActions('article', ['fetch_categories'])
  },
  computed: {
    ...mapGetters('article', ['get_categories', 'get_selected_category']),
    selected_category: {
      get() {
        return this.get_selected_category;
      },
      set(value) {
        this.update_selected_category(value);
      }
    }
  }
};
</script>

<style scoped>
.active {
  background: rgba(3, 179, 249, 0.12);
}
</style>
