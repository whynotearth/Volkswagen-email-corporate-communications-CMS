<template>
  <div>
    <BaseAppBarHeader :title="'Reset Password'" :to-link="'/login'" />
    <div class="reset-content">
      <span class="reset-title tg-body-mobile">Please input your email:</span>
    </div>
    <div class="reset-content-form">
      <form ref="form" name="reset-password" @submit.prevent="" class="pt-6 pb-8 mb-4 text-left">
        <div class="mb-4">
          <BaseInputText
            class="bg-surface"
            v-model="$v.recoveryEmail.$model"
            label="Email"
            placeholder="Email"
            :error="$v.recoveryEmail.$dirty && (!$v.recoveryEmail.required || !$v.recoveryEmail.email)"
          >
            <span v-if="$v.recoveryEmail.$dirty && !$v.recoveryEmail.required" class="text-xs text-error">
              Email is required
            </span>
            <span v-if="$v.recoveryEmail.$dirty && !$v.recoveryEmail.email" class="text-xs text-error">
              Please enter valid email
            </span>
          </BaseInputText>
        </div>
        <div class="reset-submit" @click="submit()">
          <button class="reset_button text-white bg-primary">sent reset email</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import isEmail from 'validator/lib/isEmail';
import BaseAppBarHeader from '@/components/BaseAppBarHeader';
import BaseInputText from '@/components/BaseInputText';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'ResetPassword',
  components: { BaseAppBarHeader, BaseInputText },
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
    onSuccess() {
      this.$router.push({
        name: 'VolkswagenLoadMessage',
        params: {
          reset: true
        }
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
.reset-content,
.reset-content-form {
  margin-right: 16px;
  margin-left: 16px;
}

.reset-content {
  text-align: left;
  margin-top: 16px;
}

.reset-content-form {
  margin-top: -20px;
}

@media only screen and (min-width: 600px) {
  .reset-content,
  .reset-content-form {
    margin-right: 275px;
    margin-left: 275px;
  }
}

.reset-content-form,
.reset-submit {
  text-align: center;
}
.reset_button {
  margin-top: 22px;
  margin-left: 80px;
  margin-right: 80px;
  border-radius: 23px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 8px;
  padding-right: 8px;
  width: 184px;
  outline: none;
  text-align: center;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-size: 14px;
}

.reset-title {
  text-align: left;
}
</style>
