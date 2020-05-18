<template>
  <div>
    <div class="mb-4">
      <h2 class="text-primary font-bold text-xl">
        Your Info
      </h2>
    </div>
    <div class="mb-4">
      <BaseInputText class="bg-surface" label="Name" type="text" v-model="$v.name.$model" :error="$v.name.$error">
        <span v-if="$v.name.$error" class="text-xs text-error pl-error-message">
          Name is required
        </span>
      </BaseInputText>
    </div>
    <div class="mb-4">
      <BaseInputText class="bg-surface" label="Email" type="email" v-model="$v.email.$model" :error="$v.email.$error">
        <template v-if="$v.email.$error">
          <span v-if="!$v.email.required" class="text-xs text-error pl-error-message">
            Email is required
          </span>
          <span v-if="!$v.email.email" class="text-xs text-error pl-error-message">
            Please enter valid email
          </span>
        </template>
      </BaseInputText>
    </div>
    <p v-if="get_response_message.message" class="font-bold px-4 mb-4" :class="get_response_message.class">
      {{ get_response_message.message }}
    </p>
    <div class="py-6 justify-center flex">
      <BaseButton class="w-40" @selectButton="submit()">
        SAVE
      </BaseButton>
    </div>
    <div class="justify-center flex">
      <router-link
        :to="{ name: 'ResetPassword' }"
        class="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800 underline"
      >
        Change Password
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';
import BaseInputText from '@/components/BaseInputText.vue';
import BaseButton from '@/components/BaseButton.vue';
import { sleep } from '@/helpers.js';

export default {
  name: 'BaseUserAccountInfo',
  components: { BaseInputText, BaseButton },
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    }
  },
  mounted() {
    this.fetch_profile();
  },
  methods: {
    ...mapMutations('profile', ['update_name', 'update_email', 'update_response_message']),
    ...mapActions('profile', ['fetch_profile', 'update_profile']),
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) return false;
      const payload = {
        params: {
          body: {
            name: this.name,
            email: this.email
          }
        }
      };
      this.update_profile(payload)
        .then(() => {
          this.onSuccessSubmit();
        })
        .catch(error => {
          let message = error.response.data.title ? error.response.data.title : 'An error occurred.';
          this.update_response_message({
            message: message,
            type: 'error',
            class: 'text-error'
          });
        });
    },
    async onSuccessSubmit() {
      // TODO: refactor, rename and move to helpers
      this.$store.commit('overlay/updateModel', {
        title: 'Success!',
        message: ''
      });

      await sleep(1000);

      await this.$router.push({
        name: 'Settings'
      });

      this.$store.commit('overlay/updateModel', {
        title: '',
        message: ''
      });
    }
  },
  computed: {
    ...mapGetters('profile', ['get_name', 'get_email', 'get_response_message']),
    name: {
      get() {
        return this.get_name;
      },
      set(value) {
        this.update_name(value);
      }
    },
    email: {
      get() {
        return this.get_email;
      },
      set(value) {
        this.update_email(value);
      }
    }
  }
};
</script>
