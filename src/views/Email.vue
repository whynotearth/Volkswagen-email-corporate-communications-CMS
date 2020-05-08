<template>
  <StepperManager
    :step="currentStep"
    :steps="steps"
    :options="{ submitText: 'Finish', isLastStep: currentStep === steps.length }"
    @changeStep="changeStep"
  >
    <div class="px-0 overflow-y-auto flex flex-col h-full narrow-scrollbars">
      <transition name="fade" mode="out-in">
        <SelectEmailDate v-if="currentStep === 1" ref="formStep1" />
        <DraftEmail v-if="currentStep === 2" ref="formStep2" />
        <ScheduleEmail v-if="currentStep === 3" ref="formStep3" />
        <SelectRecipents v-if="currentStep === 4" ref="formStep4" />
      </transition>
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
import { sleep } from '@/helpers.js';

export default {
  name: 'EmailsAdd',
  components: { StepperManager, SelectEmailDate, DraftEmail, ScheduleEmail, SelectRecipents },
  props: {
    step: {
      default: 1
    }
  },
  data() {
    return {
      steps: ['Select Email Date', 'Draft Email', 'Schedule Email', 'Select Recipents'],
      showResult: false
    };
  },
  computed: {
    ...mapGetters('email', [
      'get_email_date',
      'get_selected_articles',
      'get_email_recipients',
      'get_schedule_time',
      'get_selected_jumpstart'
    ]),
    currentStep() {
      return parseInt(this.step);
    }
  },
  methods: {
    ...mapActions('email', ['create_jumpstart', 'clear_email_data']),
    ...mapMutations('email', ['update_response_message']),
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
        this.clear_email_data();
        return this.$router.push({ name: 'Home' });
      }

      // finish
      const wantToFinish = newStep > this.steps.length;
      if (wantToFinish) {
        return this.submit();
      }

      // back or forward
      this.$router.push({ name: 'EmailsAdd', params: { step: newStep } });
    },

    processValidations(change) {
      this.$refs['formStep' + this.currentStep].$v.$touch();
      if (this.$refs['formStep' + this.currentStep].$v.$invalid) return false;
      return true;
    },
    submit() {
      let total_time = new Date(this.get_email_date + this.get_schedule_time).toISOString();
      const params = {
        jumpStartId: this.get_selected_jumpstart.id,
        body: {
          jumpStartId: this.get_selected_jumpstart.id,
          dateTime: total_time,
          articleIds: this.get_selected_articles.map(article => article.id),
          distributionGroups: this.get_email_recipients
        }
      };
      this.create_jumpstart({ params })
        .then(() => {
          this.clear_email_data();
          this.onSuccessSubmit();
        })
        .catch(error => {
          this.update_response_message({
            message: error.response.data.message,
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
