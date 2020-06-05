<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader title="Change Password" :to-link="{ name: 'MyAccount' }" />
    </template>
    <template #content>
      <div class="container px-4 md:px-6 text-left py-4">
        <div class="tg-body-mobile">Change password:</div>
        <form ref="form" name="reset-password" @submit.prevent="submit" class="text-left">
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
            <span
              v-if="!$v.confirmPassword.sameAsPassword && $v.confirmPassword.required"
              class="text-xs text-error pl-error-message"
            >
              Passwords must be identical.
            </span>
          </BaseInputText>
          <p v-if="get_response_message.message" class="px-4 mb-4" :class="get_response_message.class">
            {{ get_response_message.message }}
          </p>
          <div class="text-center my-8">
            <BaseButton type="submit">Change Password</BaseButton>
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required, password, sameAs } from 'vuelidate/lib/validators';
import { sleep } from '@/helpers.js';

// TODO: move logics to a component

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
      required,
      sameAsPassword: sameAs('newPassword')
    }
  },
  methods: {
    ...mapMutations('auth', [
      'updateOldPassword',
      'updateNewPassword',
      'updateConfirmPassword',
      'update_response_message'
    ]),
    ...mapActions('auth', ['changePassword']),
    async onSuccess() {
      this.$store.commit('overlay/updateModel', {
        title: '',
        message: 'Your password has been changed!'
      });

      await sleep(1000);

      await this.$router.push({
        name: 'Dashboard'
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
      const params = {
        body: {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword
        }
      };

      this.changePassword(params)
        .then(() => {
          this.onSuccess();
        })
        .catch(error => {
          let message = 'An error occured!';
          try {
            message = error.response.data[0].description;
          } catch (error) {
            //
          }

          this.update_response_message({
            message: message,
            type: 'error',
            class: 'text-error'
          });
        });
    }
  },
  destroyed() {
    this.updateOldPassword('');
    this.updateNewPassword('');
    this.updateConfirmPassword('');
    this.update_response_message({
      message: '',
      type: '',
      class: ''
    });
  },
  computed: {
    ...mapGetters('auth', ['get_new_password', 'get_old_password', 'get_confirm_password', 'get_response_message']),
    newPassword: {
      get() {
        return this.get_new_password;
      },
      set(value) {
        this.updateNewPassword(value);
      }
    },
    oldPassword: {
      get() {
        return this.get_old_password;
      },
      set(value) {
        this.updateOldPassword(value);
      }
    },
    confirmPassword: {
      get() {
        return this.get_confirm_password;
      },
      set(value) {
        this.updateConfirmPassword(value);
      }
    }
  }
};
</script>
