<template>
  <StepperManager
    :step="currentStep"
    :steps="steps"
    :options="{ submitText: 'Finish', isLastStep: currentStep === steps.length }"
    @changeStep="changeStep"
  >
    <div class="px-0 overflow-y-auto flex flex-col h-full narrow-scrollbars">
      <PostAddStep1 v-if="currentStep === 1" ref="postForm" :error="validationError" />
      <PostAddStep2 v-if="currentStep === 2" />
    </div>
  </StepperManager>
</template>

<script>
import StepperManager from '@/components/StepperManager.vue';
import PostAddStep1 from '@/components/PostAddStep1.vue';
import PostAddStep2 from '@/components/PostAddStep2.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { sleep } from '@/helpers.js';

export default {
  name: 'PostAdd',
  components: { StepperManager, PostAddStep1, PostAddStep2 },
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
    currentStep() {
      return parseInt(this.step);
    }
  },
  methods: {
    ...mapActions('post', ['add_post']),
    ...mapMutations('post', ['update_response_message']),
    changeStep(change) {
      this.update_response_message({ message: '' });

      const newStep = parseInt(this.step) + change;

      if (this.$refs.memoForm && this.step === 1 && newStep > 1) {
        this.$refs.memoForm.$v.$touch();
        if (this.$refs.memoForm.$v.$invalid) {
          this.validationError = true;
          return false;
        }
      }

      const wantToExit = newStep < 1;
      if (wantToExit) {
        this.$store.dispatch('post/clear_form_data');
        return this.$router.push({ name: 'Home' });
      }

      const wantToFinish = newStep > this.steps.length;
      if (wantToFinish) {
        return this.submit();
      }

      this.$router.push({ name: 'PostAdd', params: { step: newStep } });
    },

    submit() {
      const params = {
        body: {
          date: this.get_date,
          description: this.get_description,
          to: this.get_to,
          subject: this.get_subject,
          distributionGroup: this.get_recipients.join(',')
        }
      };
      this.add_post({ params })
        .then(() => {
          this.$store.dispatch('post/clear_form_data');
          this.onSuccessSubmit();
        })
        .catch(error => {
          this.update_response_message({
            message: error.response.data.title,
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
