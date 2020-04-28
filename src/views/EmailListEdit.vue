<template>
  <div>
    <BaseAppBarHeader
      title="Edit Email"
      :to-link="`/settings/email-lists/${$route.params.groupName}`"
      :action="{ label: 'Finish', link: '', method: 'editEmail', disabled: $v.email.$invalid }"
      @editEmail="editEmail"
    />
    <div class="container px-6 py-3">
     <div class="flex flex-wrap items-strech items-center">
      <label class="w-full text-left mb-2">Edit:</label>
      <div class="mb-4 w-full">
        <BaseInputText
          class="bg-surface text-left"
          v-model="$v.email.$model"
          label="Email Subject Line"
          placeholder="Email Subject Line"
          :error="$v.email.$dirty && (!$v.email.required || !$v.email.email)"
        >
          <span v-if="$v.email.$dirty && !$v.email.required" class="text-xs text-error pl-error-message">
            Email is required
          </span>
          <span v-if="$v.email.$dirty && !$v.email.email" class="text-xs text-error pl-error-message">
            Please enter valid email
          </span>
        </BaseInputText>
      </div>
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
  name: 'EmailListEdit',
  components: { BaseInputText, BaseAppBarHeader },
  validations: {
    email: {
      required,
      email
    }
  },
  computed: {
    ...mapGetters('distributionGroup', ['selectedEmail']),
    email: {
      get() {
        return this.selectedEmail.email;
      },
      set(value) {
        this.selectedEmail.email = value;
        this.selectEmail(this.selectedEmail);
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations('distributionGroup', ['selectEmail']),
    init() {
      if (Object.entries(this.selectedEmail).length === 0) {
        this.$store.dispatch('distributionGroup/getEmails', this.$route.params.groupName).then(data => {
          const item = data.find(item => item.id == this.$route.params.id);
          this.selectEmail(item);
        });
      }
    },
    editEmail() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }
      this.$store.dispatch('distributionGroup/editEmail').then(() => {
        this.$router.push({ name: 'EmailLists' });
      });
    }
  }
};
</script>
