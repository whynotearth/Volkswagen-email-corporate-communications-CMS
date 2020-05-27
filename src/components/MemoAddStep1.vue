<template>
  <div class="py-6 flex-grow">
    <div class="container px-4 md:px-6 text-left">
      <div
        class="mb-4 bg-white relative"
        :class="[
          {
            'is-query-empty': to_query === '',
            'is-filled': !$v.recipients.$invalid,
            error: $v.recipients.$error
          },
          $v.recipients.$error ? 'text-red-600 border-red-600' : 'text-gray-500 border-gray-600'
        ]"
      >
        <label
          class="multiselect--material-label absolute"
          v-if="!$v.recipients.$invalid"
          for="memoadd-step1-recipients"
          >To:</label
        >
        <Multiselect
          id="memoadd-step1-recipients"
          v-model="$v.recipients.$model"
          :placeholder="$v.recipients.$invalid ? 'To:' : ''"
          :options="get_recipients_available"
          :multiple="true"
          :hide-selected="true"
          :show-labels="false"
          @blur="$v.recipients.$touch()"
          @search-change="onToSearchChange"
        >
          <template v-slot:noResult>Nothing found</template>
          <template v-slot:noOptions>No options available</template>
        </Multiselect>
        <span v-if="$v.recipients.$error" class="text-xs text-error pl-error-message">
          To is required
        </span>
      </div>

      <BaseInputText
        class="bg-surface mb-4"
        v-model="$v.subject.$model"
        label="Email Subject Line"
        placeholder="Email Subject Line"
        :error="$v.subject.$dirty && !$v.subject.required"
      >
        <span v-if="$v.subject.$dirty && !$v.subject.required" class="text-xs text-error pl-error-message">
          Subject is required
        </span>
      </BaseInputText>
      <BaseInputText
        class="bg-surface mb-4"
        v-model="$v.date.$model"
        label="Memo Date"
        placeholder="Memo Date"
        :error="$v.date.$dirty && !$v.date.required"
      >
        <span v-if="$v.date.$dirty && !$v.date.required" class="text-xs text-error pl-error-message">
          Date is required
        </span>
      </BaseInputText>
      <BaseInputText
        class="bg-surface mb-4"
        v-model="$v.to.$model"
        label="Audience"
        placeholder="Audience"
        :error="$v.to.$dirty && !$v.to.required"
      >
        <span v-if="$v.to.$dirty && !$v.to.required" class="text-xs text-error pl-error-message">
          Audience is required
        </span>
      </BaseInputText>
      <BaseEditor
        class="body-1-mobile bg-surface"
        v-model="$v.description.$model"
        placeholder="Memo Body"
        :error="$v.description.$dirty && !$v.description.required"
      >
        <span v-if="$v.description.$dirty && !$v.description.required" class="text-xs text-error pl-error-message">
          Description is required
        </span>
      </BaseEditor>
      <span v-if="$v.$invalid" v-show="error" class="font-bold text-error pl-error-message">
        Please fill the memo form properly.
      </span>
    </div>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import BaseInputText from '@/components/BaseInputText.vue';
import BaseEditor from '@/components/Editor/BaseEditor.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import Multiselect from 'vue-multiselect';

export default {
  name: 'MemoAddStep1',
  components: { BaseInputText, BaseEditor, Multiselect },
  data: () => ({
    to_query: ''
  }),
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  validations: {
    subject: {
      required
    },
    to: {
      required
    },
    date: {
      required
    },
    description: {
      required
    },
    recipients: {
      required
    }
  },
  computed: {
    ...mapGetters('memo', ['get_to', 'get_subject', 'get_date', 'get_description', 'get_recipients']),
    ...mapGetters('recipient', ['get_recipients_available']),
    to: {
      get() {
        return this.get_to;
      },
      set(value) {
        this.update_to(value);
      }
    },
    subject: {
      get() {
        return this.get_subject;
      },
      set(value) {
        this.update_subject(value);
      }
    },
    description: {
      get() {
        return this.get_description;
      },
      set(value) {
        this.update_description(value);
      }
    },
    date: {
      get() {
        return this.get_date;
      },
      set(value) {
        this.update_date(value);
      }
    },
    recipients: {
      get() {
        return this.get_recipients;
      },
      set(value) {
        this.update_recipients(value);
      }
    }
  },
  methods: {
    ...mapMutations('memo', ['update_to', 'update_description', 'update_date', 'update_subject', 'update_recipients']),
    ...mapActions('recipient', ['fetch_recipients']),
    onToSearchChange(query) {
      this.to_query = query;
    }
  },
  mounted() {
    this.fetch_recipients();
  }
};
</script>
