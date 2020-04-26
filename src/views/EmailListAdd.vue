<template>
  <div>
    <BaseAppBarHeader
      title="Add Email"
      :to-link="`/settings/email-lists/${$route.params.groupName}`"
      :action="{ label: 'Finish', link: '', method: 'addEmail', disabled: $v.email.$invalid }"
      @addEmail="addEmail"
    />
    <div class="flex flex-wrap items-strech items-center px-4 py-3">
      <label class="w-full text-left mb-2">Add New:</label>
      <div class="mb-4 w-full">
        <BaseInputText
          class="bg-surface text-left"
          v-model="$v.email.$model"
          label="Email Subject Line"
          placeholder="Email Subject Line"
          :error="$v.email.$dirty && !$v.email.required"
        >
          <span v-if="$v.email.$dirty && !$v.email.required" class="text-xs text-error pl-4.5">
            Email is required
          </span>
          <span v-if="$v.email.$dirty && !$v.email.email" class="text-xs text-error pl-4.5">
            Please enter valid email
          </span>
        </BaseInputText>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import isEmail from 'validator/lib/isEmail';
import BaseInputText from '@/components/BaseInputText.vue';
import { required, email } from 'vuelidate/lib/validators';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'EmailListAdd',
  components: { BaseInputText, BaseAppBarHeader },
  validations: {
    email: {
      required,
      email
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.getters['distributionGroup/email'];
      },
      set(value) {
        this.updateEmail(value);
      }
    }
  },
  destroyed() {
    this.updateEmail('');
  },
  methods: {
    ...mapMutations('distributionGroup', ['updateEmail']),
    addEmail() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }
      this.$store.dispatch('distributionGroup/addEmail').then(() => {
        this.$router.push({ name: 'EmailLists' });
      });
    }
  }
};
</script>
