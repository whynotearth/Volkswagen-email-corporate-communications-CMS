<template>
  <StepperManager
    :step="currentStep"
    :steps="steps"
    :options="{ submitText: 'Finish', isLastStep: currentStep === steps.length }"
    @changeStep="changeStep"
  >
    <div class="px-0 overflow-y-auto flex flex-col h-full narrow-scrollbars">
      <SelectEmailDate v-if="currentStep === 1" ref="formStep1" />
      <DraftEmail v-if="currentStep === 2" ref="formStep2" />
      <ScheduleEmail v-if="currentStep === 3" ref="formStep3" />
      <SelectRecipents v-if="currentStep === 4" ref="formStep4" />
    </div>
  </StepperManager>
</template>

<script>
import StepperManager from '@/components/StepperManager.vue';
import SelectEmailDate from '@/components/Email/SelectEmailDate.vue';
import DraftEmail from '@/components/Email/DraftEmail.vue';
import ScheduleEmail from '@/components/Email/ScheduleEmail.vue';
import SelectRecipents from '@/components/Email/SelectRecipents.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Email',
  components: { StepperManager, SelectEmailDate, DraftEmail, ScheduleEmail, SelectRecipents },
  props: {
    step: {
      default: 1
    }
  },
  data() {
    return {
      steps: ['SelectEmailDate', 'Draft Email', 'Schedule Email', 'Select Recipents'],
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
    changeStep(change) {
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
      this.$router.push({ name: 'Email', params: { step: newStep } });
    },

    processValidations(change) {
      this.$refs['formStep' + this.currentStep].$v.$touch();
      if (this.$refs['formStep' + this.currentStep].$v.$invalid) {
        this.validationError = true;
        return false;
      }
      return true;
    }
  }
};
</script>
