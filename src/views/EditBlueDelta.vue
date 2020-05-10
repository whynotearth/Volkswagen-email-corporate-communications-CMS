<template>
  <LayoutFixedScrollable>
    <template #content>
      <div class="">
        <BaseAppBarHeader class="sticky top-0 bg-white" title="Wednesday, 6 May, 2020 " to-link="/blue-delta" />
        <div class="flex mb-40">
          <div class="container px-0 md:px-6 pt-4 px-4">
            <div class="flex justify-center p-4">
              <img
                class="cursor-pointer"
                src="https://user-images.githubusercontent.com/5694308/81145997-a7721680-8fa1-11ea-919a-9b11ef4cc8c7.png"
                alt="image"
              />
            </div>
            <div class="py-4">
              <div
                class="mb-4 bg-white relative"
                :class="[
                  {
                    'is-query-empty': to_query === '',
                    'is-filled': recipients.length > 0,
                    error: recipientsIsDirthy && recipients.length === 0
                  },
                  recipientsIsDirthy && recipients.length === 0
                    ? 'text-red-600 border-red-600'
                    : 'text-gray-500 border-gray-600'
                ]"
              >
                <label
                  class="multiselect--material-label absolute left-0"
                  v-if="recipients.length > 0"
                  for="memoadd-step1-recipients"
                >
                  Recipients:
                </label>
                <Multiselect
                  id="memoadd-step1-recipients"
                  v-model="recipients"
                  :placeholder="recipients.length === 0 ? 'Recipients:' : ''"
                  :options="get_recipients_available"
                  :multiple="true"
                  :hide-selected="true"
                  :show-labels="false"
                  @close="recipientsIsDirthy = true"
                  @search-change="onToSearchChange"
                  open-direction="bottom"
                >
                  <template v-slot:noResult>Nothing found</template>
                  <template v-slot:noOptions>No options available</template>
                </Multiselect>
                <span v-if="recipientsIsDirthy && recipients.length === 0" class="text-xs text-error pl-error-message">
                  To is required
                </span>
              </div>
            </div>
            <div>
              <BaseTimePicker v-model="time" />
            </div>
            <div class="px-12 py-4">
              <BaseButton classes="w-full sm:w-1/2" type="secondary">Save</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

import BaseButton from '@/components/BaseButton.vue';
import BaseTimePicker from '@/components/BaseTimePicker.vue';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import Multiselect from 'vue-multiselect';

export default {
  name: 'EditBlueDelta',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: { BaseAppBarHeader, LayoutFixedScrollable, Multiselect, BaseButton, BaseTimePicker },
  data() {
    return {
      recipientsIsDirthy: false,
      to_query: '',
      time: null
    };
  },
  computed: {
    ...mapGetters('memo', ['get_recipients']),
    ...mapGetters('recipient', ['get_recipients_available']),
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
    ...mapMutations('memo', ['update_recipients']),
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
