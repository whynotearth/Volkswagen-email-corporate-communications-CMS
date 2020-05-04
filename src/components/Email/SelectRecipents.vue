<template>
  <div>
    <div class="py-6 flex-grow">
      <div class="container px-4 text-left">
        <div
          class="mb-4 bg-white relative"
          :class="[
            {
              'is-query-empty': to_query === '',
              'is-filled': !$v.email_recipients.$invalid,
              error: $v.email_recipients.$error
            },
            $v.email_recipients.$error ? 'text-red-600 border-red-600' : 'text-gray-500 border-gray-600'
          ]"
        >
          <label
            class="multiselect--material-label absolute"
            v-if="!$v.email_recipients.$invalid"
            for="email_recipients"
          >
            To:
          </label>
          <Multiselect
            id="email_recipients"
            v-model="$v.email_recipients.$model"
            :placeholder="$v.email_recipients.$invalid ? 'To:' : ''"
            :options="get_recipients_available"
            :multiple="true"
            :hide-selected="true"
            :show-labels="false"
            @search-change="onToSearchChange"
          >
            <template v-slot:noResult>Nothing found</template>
            <template v-slot:noOptions>No options available</template>
          </Multiselect>
          <span v-if="$v.email_recipients.$error" class="text-xs text-error">
            Please select recipients.
          </span>
          <template v-if="get_response_message.message">
            <p :class="get_response_message.class" class="py-4 font-bold">{{ get_response_message.message }}</p>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'SelectRecipents',
  components: { Multiselect },
  validations: {
    email_recipients: {
      required
    }
  },
  data() {
    return {
      to_query: ''
    };
  },
  mounted() {
    if (!this.get_schedule_time) return this.$router.push({ name: 'EmailsAdd', params: { step: 3 } });
    this.fetch_recipients();
  },
  computed: {
    ...mapGetters('email', ['get_email_recipients', 'get_schedule_time', 'get_response_message']),
    ...mapGetters('recipient', ['get_recipients_available']),
    email_recipients: {
      get() {
        return this.get_email_recipients;
      },
      set(value) {
        this.update_email_recipients(value);
      }
    }
  },
  methods: {
    ...mapMutations('email', ['update_email_recipients']),
    ...mapActions('recipient', ['fetch_recipients']),
    onToSearchChange(query) {
      this.to_query = query;
    }
  }
};
</script>

<style></style>
