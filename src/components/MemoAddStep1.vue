<template>
  <div class="p-6 flex-grow">
    <div class="container">
      <BaseInputText v-model="subject" label="Email Subject Line" placeholder="Email Subject Line"></BaseInputText>
      <BaseInputText v-model="date" label="Memo Date" placeholder="Memo Date"></BaseInputText>
      <BaseInputText v-model="to" label="Audience" placeholder="Audience"></BaseInputText>
      <BaseInputTextarea v-model="description" label="Memo Body" placeholder="Memo Body"></BaseInputTextarea>
    </div>
  </div>
</template>

<script>
import BaseInputText from '@/components/BaseInputText.vue';
import BaseInputTextarea from '@/components/BaseInputTextarea.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'MemoAddStep1',
  components: { BaseInputText, BaseInputTextarea },
  computed: {
    ...mapGetters('jumpstart', ['get_to', 'get_subject', 'get_date', 'get_description']),
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
    ...mapMutations('jumpstart', ['update_to', 'update_description', 'update_date', 'update_subject'])
  }
};
</script>
