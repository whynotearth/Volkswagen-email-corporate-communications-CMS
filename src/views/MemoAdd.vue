<template>
  <StepperManager
    :step="currentStep"
    :steps="steps"
    :options="{ submitText: 'Finish & Send', isLastStep: currentStep === steps.length }"
    @changeStep="changeStep"
  >
    <div class="px-0 overflow-y-auto flex flex-col h-full narrow-scrollbars">
      <MemoAddStep1 v-if="currentStep === 1"></MemoAddStep1>
      <MemoAddStep2 v-if="currentStep === 2"></MemoAddStep2>
      <!-- <SplashScreen v-if="currentStep === 2"></SplashScreen> -->
    </div>
  </StepperManager>
</template>

<script>
import StepperManager from '@/components/StepperManager.vue';
import MemoAddStep1 from '@/components/MemoAddStep1.vue';
import MemoAddStep2 from '@/components/MemoAddStep2.vue';
// import SplashScreen from '@/components/SplashScreen.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'MemoAdd',
  components: { StepperManager, MemoAddStep1, MemoAddStep2 },
  props: {
    step: {
      default: 1
    }
  },
  data: () => ({
    steps: ['Internal Memo', 'Preview Memo']
  }),
  computed: {
    ...mapGetters('jumpstart', ['get_to', 'get_subject', 'get_date', 'get_description']),
    currentStep() {
      return parseInt(this.step);
    }
  },
  methods: {
    ...mapActions('jumpstart', ['test']),
    ...mapMutations('jumpstart', ['update_response_message']),
    parseInt,
    changeStep(change) {
      this.update_response_message({ message: '' });

      const newStep = parseInt(this.step) + change;

      const wantToExit = newStep < 1;
      if (wantToExit) {
        return this.$router.push({ name: 'Home' });
      }

      const wantToFinish = newStep > this.steps.length;
      if (wantToFinish) {
        return this.submit();
      }

      this.$router.push({ name: 'MemoAdd', params: { step: newStep } });
    },
    async submit() {
      const params = {
        body: {
          date: this.get_date,
          description: this.get_description,
          to: this.get_to,
          subject: this.get_subject
        }
      };
      try {
        await this.test({ params });
        this.$router.push({ name: 'Success', params: { title: 'Success!' } });
      } catch (error) {
        this.update_response_message({
          // TODO: use network response
          message: 'Not sent, please check the form fields.',
          type: 'error',
          class: 'text-error'
        });

        console.log(error);
      }
    }
  }
};
</script>
