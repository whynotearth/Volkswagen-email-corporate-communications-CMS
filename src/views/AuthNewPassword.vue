<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader :title="'Set New Password'" :to-link="'/reset-password'" />
    </template>
    <template #content>
      <div class="container px-0 md:px-6 text-left py-4">
        <div class="reset-content mb-2">
          <span class="reset-title tg-body-mobile">Enter new password:</span>
        </div>
        <div class="reset-content-form">
          <form ref="form" name="reset-password" @submit.prevent="" class="pb-8 mb-4 text-left">
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
            <div class="reset-submit" @click="submit()">
              <BaseButton>Reset Password</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import store from '@/store';
import BaseAppBarHeader from '@/components/BaseAppBarHeader';
import BaseInputText from '@/components/BaseInputText';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable.vue';
import BaseButton from '@/components/BaseButton.vue';
import { required, password } from 'vuelidate/lib/validators';
import { sleep } from '@/helpers.js';

export default {
  name: 'NewPassword',
  components: { BaseAppBarHeader, BaseInputText, LayoutFixedScrollable, BaseButton },
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
    async onSuccess() {
      this.$store.commit('overlay/updateModel', {
        title: '',
        message: 'Your password has been reset!'
      });

      await sleep(1000);

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
        return this.$store.getters['auth/get_new_password'];
      },
      set(value) {
        this.$store.commit('auth/updateNewPassword', value);
      }
    },
    confirmPassword: {
      get() {
        return this.$store.getters['auth/get_confirm_password'];
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
.reset-content-form,
.reset-submit {
  text-align: center;
}

.reset-title {
  text-align: left;
}
</style>
