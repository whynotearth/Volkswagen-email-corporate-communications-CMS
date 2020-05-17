<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="'Reset Password'" :to-link="'/login'" />
    </template>
    <template #content>
      <div class="container px-4 md:px-6 py-4">
        <div class="reset-content mb-2">
          <span class="reset-title tg-body-mobile">Please input your email:</span>
        </div>
        <div class="reset-content-form">
          <form ref="form" name="reset-password" @submit.prevent="" class="pb-8 mb-4 text-left">
            <div class="mb-4">
              <BaseInputText
                class="bg-surface"
                v-model="$v.recoveryEmail.$model"
                label="Email"
                placeholder="Email"
                :error="$v.recoveryEmail.$dirty && (!$v.recoveryEmail.required || !$v.recoveryEmail.email)"
              >
                <span
                  v-if="$v.recoveryEmail.$dirty && !$v.recoveryEmail.required"
                  class="text-xs text-error pl-error-message"
                >
                  Email is required
                </span>
                <span
                  v-if="$v.recoveryEmail.$dirty && !$v.recoveryEmail.email"
                  class="text-xs text-error pl-error-message"
                >
                  Please enter valid email
                </span>
              </BaseInputText>
            </div>
            <div class="reset-submit" @click="submit()">
              <BaseButton>Send reset email</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import store from '@/store';
import isEmail from 'validator/lib/isEmail';
import BaseAppBarHeader from '@/components/BaseAppBarHeader';
import BaseInputText from '@/components/BaseInputText';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseButton from '@/components/BaseButton.vue';
import { required, email } from 'vuelidate/lib/validators';
import { sleep } from '@/helpers.js';

export default {
  name: 'AuthResetPassword',
  components: { BaseAppBarHeader, BaseInputText, LayoutFixedScrollable, BaseButton },
  validations: {
    recoveryEmail: {
      required,
      email
    }
  },
  beforeDestroy() {
    this.cleanup();
  },
  methods: {
    cleanup() {
      this.recoveryEmail = '';
    },
    updateActiveState(value) {
      this.$store.dispatch('auth/updateActiveState', value);
    },
    async onSuccess() {
      this.$store.commit('overlay/updateModel', {
        title: '',
        message: 'Your password reset email is on the way!'
      });

      await sleep(100000);

      await this.$router.push({
        name: 'Home'
      });

      this.$store.commit('overlay/updateModel', {
        title: '',
        message: ''
      });
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }
      this.resetPassword().then(() => {
        this.onSuccess();
      });
    },
    async resetPassword() {
      await this.$store.dispatch('auth/sendResetPasswordLink');
    }
  },
  computed: {
    recoveryEmail: {
      get() {
        return this.$store.getters['auth/recoveryEmail'];
      },
      set(value) {
        this.$store.commit('auth/updateRecoveryEmail', value);
      }
    }
  }
};
</script>

<style scoped>
.reset-content {
  text-align: left;
  margin-top: 16px;
}

.reset-content-form,
.reset-submit {
  text-align: center;
}

.reset-title {
  text-align: left;
}
</style>
