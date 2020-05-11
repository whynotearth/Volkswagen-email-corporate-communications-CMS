<template>
  <StepperManager
    :step="currentStep"
    :steps="steps"
    :options="{ submitText: 'Finish', isLastStep: currentStep === steps.length }"
    @changeStep="changeStep"
  >
    <div v-if="currentStep !== 3" class="px-0 overflow-y-auto flex flex-col h-full narrow-scrollbars">
      <ArticleAddStep1 v-if="currentStep === 1" ref="formStep1" :error="validationError" />
      <ArticleAddStep2 v-if="currentStep === 2" ref="formStep2" :error="validationError" />
    </div>
    <ArticleAddStep3 v-if="currentStep === 3" :error="validationError" />
  </StepperManager>
</template>

<script>
import StepperManager from '@/components/StepperManager.vue';
import ArticleAddStep1 from '@/components/ArticleAddStep1.vue';
import ArticleAddStep2 from '@/components/ArticleAddStep2.vue';
import ArticleAddStep3 from '@/components/ArticleAddStep3.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { sleep, formatISODate } from '@/helpers.js';

export default {
  name: 'ArticleAdd',
  components: { StepperManager, ArticleAddStep1, ArticleAddStep2, ArticleAddStep3 },
  props: {
    step: {
      default: 1
    }
  },
  data() {
    return {
      steps: ['Choose Category', 'New Article', 'Schedule Article'],
      showResult: false,
      validationError: false
    };
  },
  computed: {
    ...mapGetters('article', [
      'get_date',
      'get_headline',
      'get_description',
      'get_price',
      'get_eventDate',
      'get_images',
      'get_selected_category'
    ]),
    currentStep() {
      return parseInt(this.step);
    }
  },
  methods: {
    ...mapActions('article', ['add_article']),
    ...mapMutations('article', ['update_response_message']),
    changeStep(change) {
      this.update_response_message({ message: '' });
      const newStep = this.currentStep + change;

      // go forward
      if (change > 0) {
        const isCurrentStepValid = this.processValidations(change);
        if (!isCurrentStepValid) return;
      }

      // exit
      const wantToExit = newStep < 1;
      if (wantToExit) {
        this.$store.dispatch('article/clear_form_data');
        return this.$router.push({ name: 'Home' });
      }

      // finish
      const wantToFinish = newStep > this.steps.length;
      if (wantToFinish) {
        return this.submit();
      }

      // back or forward
      this.$router.push({ name: 'ArticleAdd', params: { step: newStep } });
    },

    processValidations(change) {
      if (!this.$refs['formStep' + this.currentStep]) {
        return true;
      }
      this.$refs['formStep' + this.currentStep].$v.$touch();
      if (this.$refs['formStep' + this.currentStep].$v.$invalid) {
        this.validationError = true;
        return false;
      }
      return true;
    },

    submit() {
      const date_time = this.get_date ? new Date(formatISODate(this.get_date)).toISOString() : undefined;
      const event_date_time = this.get_eventDate
        ? new Date(formatISODate(this.get_eventDate)).toISOString()
        : undefined;
      const params = {
        body: {
          date: date_time,
          categoryId: this.get_selected_category.id,
          categorySlug: this.get_selected_category.slug,
          headline: this.get_headline,
          description: this.get_description,
          price: this.get_price,
          eventDate: event_date_time,
          images: this.get_images
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
    },

    async onSuccessSubmit() {
      // TODO: refactor, rename and move to helpers
      this.$store.commit('overlay/updateModel', {
        title: 'Success!',
        message: ''
      });

      await sleep(1000);

      await this.$router.push({
        name: 'Home'
      });

      this.$store.commit('overlay/updateModel', {
        title: '',
        message: ''
      });
    }
  }
};
</script>
