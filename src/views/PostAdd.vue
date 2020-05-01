<template>
  <StepperManager
    :step="currentStep"
    :steps="steps"
    :options="{ submitText: 'Finish', isLastStep: currentStep === steps.length }"
    @changeStep="changeStep"
  >
    <div class="px-0 overflow-y-auto flex flex-col h-full narrow-scrollbars">
      <PostAddStep1 v-if="currentStep === 1" ref="formStep1" :error="validationError" />
      <PostAddStep2 v-if="currentStep === 2" ref="formStep2" :error="validationError" />
      <PostAddStep3 v-if="currentStep === 3" ref="formStep3" :error="validationError" />
    </div>
  </StepperManager>
</template>

<script>
import StepperManager from '@/components/StepperManager.vue';
import PostAddStep1 from '@/components/PostAddStep1.vue';
import PostAddStep2 from '@/components/PostAddStep2.vue';
import PostAddStep3 from '@/components/PostAddStep3.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { sleep, formatISODate } from '@/helpers.js';

export default {
  name: 'PostAdd',
  components: { StepperManager, PostAddStep1, PostAddStep2, PostAddStep3 },
  props: {
    step: {
      default: 1
    }
  },
  data() {
    return {
      steps: ['Choose Category', 'New Post', 'Schedule Post'],
      showResult: false,
      validationError: false
    };
  },
  computed: {
    ...mapGetters('post', [
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
    ...mapActions('post', ['add_post']),
    ...mapMutations('post', ['update_response_message']),
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
        this.$store.dispatch('post/clear_form_data');
        return this.$router.push({ name: 'Home' });
      }

      // finish
      const wantToFinish = newStep > this.steps.length;
      if (wantToFinish) {
        return this.submit();
      }

      // back or forward
      this.$router.push({ name: 'PostAdd', params: { step: newStep } });
    },

    processValidations(change) {
      this.$refs['formStep' + this.currentStep].$v.$touch();
      if (this.$refs['formStep' + this.currentStep].$v.$invalid) {
        this.validationError = true;
        return false;
      }
      return true;
    },

    submit() {
      const params = {
        body: {
          date: this.get_date ? formatISODate(this.get_date) : undefined,
          categoryId: this.get_selected_category.id,
          headline: this.get_headline,
          description: this.get_description,
          price: this.get_price,
          eventDate: this.get_eventDate ? formatISODate(this.get_eventDate) : undefined,
          images: this.get_images
        }
      };
      this.add_post({ params })
        .then(() => {
          this.$store.dispatch('post/clear_form_data');
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
