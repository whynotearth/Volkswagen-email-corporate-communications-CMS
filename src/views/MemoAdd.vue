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
    </div>
  </StepperManager>
</template>

<script>
import StepperManager from '@/components/StepperManager.vue';
import MemoAddStep1 from '@/components/MemoAddStep1.vue';
import MemoAddStep2 from '@/components/MemoAddStep2.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { sleep } from '@/helpers.js';

export default {
  name: 'MemoAdd',
  components: { StepperManager, MemoAddStep1, MemoAddStep2 },
  props: {
    step: {
      default: 1
    }
  },
  data: () => ({
    steps: ['Internal Memo', 'Preview Memo'],
    showResult: false
  }),
  computed: {
    ...mapGetters('memo', ['get_to', 'get_subject', 'get_date', 'get_description']),
    currentStep() {
      return parseInt(this.step);
    }
  },
  methods: {
    ...mapActions('memo', ['memo']),
    ...mapMutations('memo', ['update_response_message']),
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
        await this.memo({ params });
        this.onSuccessSubmit();
      } catch (error) {
        this.update_response_message({
          // TODO: use network response
          message: 'Not sent, please check the form fields.',
          type: 'error',
          class: 'text-error'
        });

        console.log(error);
      }
    },

    async onSuccessSubmit() {
      this.$store.commit('overlay/updateModel', {
        title: 'Success!',
        message: ''
      });

      await sleep(2000);

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
