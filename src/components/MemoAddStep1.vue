<template>
  <div class="py-6 flex-grow">
    <div class="container px-4 md:px-6 text-left">
      <Multiselect
        class="mb-4"
        v-model="recipients"
        placeholder="To:"
        :options="get_recipients"
        :multiple="true"
        :hide-selected="true"
      ></Multiselect>

      <BaseInputText
        class="bg-surface"
        v-model="$v.subject.$model"
        label="Email Subject Line"
        placeholder="Email Subject Line"
        :error="$v.subject.$dirty && !$v.subject.required"
      >
        <span v-if="$v.subject.$dirty && !$v.subject.required" class="text-xs text-error">
          Subject is required
        </span>
      </BaseInputText>
      <BaseInputText
        class="bg-surface"
        v-model="$v.date.$model"
        label="Memo Date"
        placeholder="Memo Date"
        :error="$v.date.$dirty && !$v.date.required"
      >
        <span v-if="$v.date.$dirty && !$v.date.required" class="text-xs text-error">
          Date is required
        </span>
      </BaseInputText>
      <BaseInputText
        class="bg-surface"
        v-model="$v.to.$model"
        label="Audience"
        placeholder="Audience"
        :error="$v.to.$dirty && !$v.to.required"
      >
        <span v-if="$v.to.$dirty && !$v.to.required" class="text-xs text-error">
          Audience is required
        </span>
      </BaseInputText>
      <BaseInputTextarea
        class="body-1-mobile bg-surface"
        v-model="$v.description.$model"
        label="Memo Body"
        placeholder="Memo Body"
        :error="$v.description.$dirty && !$v.description.required"
      >
        <span v-if="$v.description.$dirty && !$v.description.required" class="text-xs text-error">
          Description is required
        </span>
      </BaseInputTextarea>
      <span v-if="$v.$invalid" v-show="error" class="font-bold text-error">
        Please fill the memo form properly.
      </span>
    </div>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import BaseInputText from '@/components/BaseInputText.vue';
import BaseInputTextarea from '@/components/BaseInputTextarea.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import Multiselect from 'vue-multiselect';

export default {
  name: 'MemoAddStep1',
  components: { BaseInputText, BaseInputTextarea, Multiselect },
  data: () => ({
    recipients: []
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
    }
  },
  computed: {
    ...mapGetters('memo', ['get_to', 'get_subject', 'get_date', 'get_description']),
    ...mapGetters('recipient', ['get_recipients']),
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
    }
  },
  methods: {
    ...mapMutations('memo', ['update_to', 'update_description', 'update_date', 'update_subject']),
    ...mapActions('recipient', ['fetch_recipients'])
  },
  mounted() {
    this.fetch_recipients();
  }
};
</script>
