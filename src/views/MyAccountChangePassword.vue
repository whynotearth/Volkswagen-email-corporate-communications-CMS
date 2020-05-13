<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader title="Change Password" :to-link="{ name: 'MyAccount' }" />
    </template>
    <template #content>
      <div class="container px-4 md:px-6 text-left py-4">
        <div class="tg-body-mobile">Change password:</div>
        <form ref="form" name="reset-password" @submit.prevent="" class="text-left">
          <BaseInputText
            class="bg-surface my-4"
            v-model="$v.oldPassword.$model"
            label="Old Password"
            placeholder="Old Password"
            type="password"
            :error="$v.oldPassword.$dirty && !$v.oldPassword.required"
          >
            <span v-if="$v.oldPassword.$dirty && !$v.oldPassword.required" class="text-xs text-error pl-error-message">
              Old Password is required
            </span>
          </BaseInputText>
          <BaseInputText
            class="bg-surface my-4"
            v-model="$v.newPassword.$model"
            label="New Password"
            placeholder="New Password"
            type="password"
            :error="$v.newPassword.$dirty && !$v.newPassword.required"
          >
            <span v-if="$v.newPassword.$dirty && !$v.newPassword.required" class="text-xs text-error pl-error-message">
              New Password is required
            </span>
          </BaseInputText>
          <BaseInputText
            class="bg-surface my-4"
            v-model="$v.confirmPassword.$model"
            label="Confirm New Password"
            placeholder="Confirm New Password"
            type="password"
            :error="$v.confirmPassword.$dirty && !$v.confirmPassword.required"
          >
            <span
              v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.required"
              class="text-xs text-error pl-error-message"
            >
              Confirm New Password is required
            </span>
            <span v-if="showMessage" class="text-xs text-error">
              Password don't match
            </span>
          </BaseInputText>
          <div class="text-center my-8" @click="submit()">
            <BaseButton>Change Password</BaseButton>
          </div>
        </form>
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
  name: 'ChangePassword',
  components: { BaseAppBarHeader, BaseInputText, LayoutFixedScrollable, BaseButton },
  validations: {
    oldPassword: {
      required
    },
    newPassword: {
      required
    },
    confirmPassword: {
      required
    }
  },
  data() {
    return {
      showMessage: false
    };
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
        return this.$store.getters['auth/newPassword'];
      },
      set(value) {
        this.$store.commit('auth/updateNewPassword', value);
      }
    },
    oldPassword: {
      get() {
        return this.$store.getters['auth/oldPassword'];
      },
      set(value) {
        this.$store.commit('auth/updateOldPassword', value);
      }
    },
    confirmPassword: {
      get() {
        return this.$store.getters['auth/confirmPassword'];
      },
      set(value) {
        this.$store.commit('auth/updateConfirmPassword', value);
      }
    }
  }
};
</script>

<style scoped></style>
