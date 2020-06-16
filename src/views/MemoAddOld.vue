<template>
  <LayoutStepperManager
    :step="currentStep"
    :steps="steps"
    :options="{ submitText: 'Finish & Send', isLastStep: currentStep === steps.length }"
    @changeStep="changeStep"
  >
    <div class="px-0 flex flex-col">
      <transition name="fadeslower" mode="out-in">
        <MemoAddStep1 v-if="currentStep === 1" ref="memoForm" :error="validationError"></MemoAddStep1>
        <MemoAddStep2 v-if="currentStep === 2"></MemoAddStep2>
      </transition>
    </div>
  </LayoutStepperManager>
</template>

<script>
import LayoutStepperManager from '@/components/LayoutStepperManager.vue';
import MemoAddStep1 from '@/components/MemoAddStep1.vue';
import MemoAddStep2 from '@/components/MemoAddStep2.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { sleep } from '@/helpers.js';

export default {
  name: 'MemoAdd',
  components: { LayoutStepperManager, MemoAddStep1, MemoAddStep2 },
  props: {
    step: {
      default: 1
    }
  },
  data: () => ({
    steps: ['Internal Memo', 'Preview Memo'],
    showResult: false,
    validationError: false
  }),
  computed: {
    ...mapGetters('memo', ['get_to', 'get_subject', 'get_date', 'get_description', 'get_recipients']),
    currentStep() {
      return parseInt(this.step);
    }
  },
  methods: {
    ...mapActions('memo', ['add_memo']),
    ...mapMutations('memo', ['update_response_message']),
    parseInt,
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
        this.$store.dispatch('memo/clear_form_data');
        return this.$router.push({ name: 'Dashboard' });
      }

      const wantToFinish = newStep > this.steps.length;
      if (wantToFinish) {
        return this.submit();
      }

      this.$router.push({ name: 'MemoAdd', params: { step: newStep } });
    },

    submit() {
      const params = {
        body: {
          date: this.get_date,
          description: this.get_description,
          to: this.get_to,
          subject: this.get_subject,
          distributionGroups: this.get_recipients
        }
      };
      this.add_memo({ params })
        .then(() => {
          this.$store.dispatch('memo/clear_form_data');
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
        name: 'Dashboard'
      });

      this.$store.commit('overlay/updateModel', {
        title: '',
        message: ''
      });
    }
  }
};
</script>
