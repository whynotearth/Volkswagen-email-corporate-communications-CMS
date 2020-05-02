<template>
  <div>
    <BaseAppBarHeader :title="'Set New Password'" :to-link="'/reset-password'" />
    <div class="reset-content">
      <span class="reset-title tg-body-mobile">Enter new password:</span>
    </div>
    <div class="reset-content-form">
      <form ref="form" name="reset-password" @submit.prevent="" class="pt-6 pb-8 mb-4 text-left">
        <div class="mb-4">
          <BaseInputText
            class="bg-surface"
            v-model="$v.newPassword.$model"
            label="New Password"
            placeholder="New Password"
            type="password"
            :error="$v.newPassword.$dirty && !$v.newPassword.required"
          >
            <span v-if="$v.newPassword.$dirty && !$v.newPassword.required" class="text-xs text-error">
              New Password is required
            </span>
          </BaseInputText>
        </div>
        <div class="mb-4">
          <BaseInputText
            class="bg-surface"
            v-model="$v.confirmPassword.$model"
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            :error="$v.confirmPassword.$dirty && !$v.confirmPassword.required"
          >
            <span v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.required" class="text-xs text-error">
              Confirm Password is required
            </span>
            <span v-if="showMessage" class="text-xs text-error">
              Password don't match
            </span>
          </BaseInputText>
        </div>
        <div class="reset-submit">
          <button @click="submit()" class="reset_button text-white bg-primary">Reset Password</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import BaseAppBarHeader from '@/components/BaseAppBarHeader';
import BaseInputText from '@/components/BaseInputText';
import { required, password } from 'vuelidate/lib/validators';

export default {
  name: 'NewPassword',
  components: { BaseAppBarHeader, BaseInputText },
  validations: {
    newPassword: {
      required
    },
    recoveryEmail: {
      required
    },
    confirmPassword: {
      required
    },
    token: {
      required
    }
  },
  data() {
    return {
      showMessage: false
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    this.token = urlParams.get('token');
    this.recoveryEmail = urlParams.get('email');
  },
  methods: {
    onSuccess() {
      this.$router.push({
        name: 'VolkswagenLoadMessage',
        params: {
          confirmReset: true
        }
      });
    },

    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }

      if (this.passwordMatch) {
        this.showMessage = true;
        return;
      } else {
        this.newPasswordRecovery().then(() => {
          this.onSuccess();
        });
      }
    },
    async newPasswordRecovery() {
      await this.$store.dispatch('auth/setNewPassword');
      this.$store.dispatch('snackbar/show', {
        color: 'success',
        text: 'Reset password is successful',
        class: 'dark--text'
      });
    }
  },
  computed: {
    passwordMatch() {
      return this.confirmPassword !== this.newPassword;
    },
    newPassword: {
      get() {
        return this.$store.getters['auth/newPassword'];
      },
      set(value) {
        this.$store.commit('auth/updateNewPassword', value);
      }
    },
    confirmPassword: {
      get() {
        return this.$store.getters['auth/confirmPassword'];
      },
      set(value) {
        this.$store.commit('auth/updateConfirmPassword', value);
      }
    },
    token: {
      get() {
        return this.$store.getters['auth/token'];
      },
      set(value) {
        this.$store.commit('auth/updateToken', value);
      }
    },
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
  margin-top: 16px;
  text-align: left;
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
