<template>
  <LayoutFixedScrollable>
    <template #content>
      <div class="">
        <BaseAppBarHeader class="sticky top-0 bg-white" title="Wednesday, 6 May, 2020 " to-link="/jumpstart-lists" />
        <div class="flex mb-40">
          <div class="container px-0 md:px-6 pt-4 px-4">
            <div class="flex justify-center p-4">
              <div class="relative">
                <EmailPreview />
                <router-link
                  :to="{ name: 'BlueDeltaRearrange', params: { id: id || 1 } }"
                  class="absolute bg-opacity-50 bg-black -mx-4 md:m-0 inset-0 text-white"
                >
                  <div class="flex h-full bg-transparent justify-center items-center">
                    <RearrangeIcon />
                    <span class="ml-4 em-high uppercase tg-color-label-mobile leading-normal">REARRANGE</span>
                  </div>
                </router-link>
              </div>
            </div>
            <div class="py-4">
              <div
                class="mb-4 bg-white relative text-left"
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
                  class="multiselect--material-label absolute left-0"
                  v-if="!$v.email_recipients.$invalid"
                  for="email_recipients"
                >
                  Recipients:
                </label>
                <Multiselect
                  id="edit-blue-delta"
                  :placeholder="email_recipients.length === 0 ? 'Recipients:' : ''"
                  v-model="$v.email_recipients.$model"
                  @blur="$v.email_recipients.$touch()"
                  :options="get_recipients_available"
                  :multiple="true"
                  :hide-selected="true"
                  :show-labels="false"
                  @search-change="onToSearchChange"
                  open-direction="bottom"
                >
                  <template v-slot:noResult>Nothing found</template>
                  <template v-slot:noOptions>No options available</template>
                </Multiselect>
                <span v-if="$v.email_recipients.$error" class="text-xs text-error">
                  Please select recipients.
                </span>
              </div>
            </div>
            <div>
              <BaseTimePicker v-model="$v.time.$model" :emailDate="get_email_date" @blur="$v.time.$touch()" />
              <span v-if="$v.time.$error" class="text-xs text-error">
                Please schedule time.
              </span>
            </div>
            <div class="px-12 py-4">
              <BaseButton @click="updateBlueDelta" class="w-full sm:w-1/2" bgType="secondary">Save</BaseButton>
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
import EmailPreview from '@/components/Email/EmailPreview.vue';
import Multiselect from 'vue-multiselect';
import RearrangeIcon from '@/assets/Rearrange.svg';

export default {
  name: 'EditBlueDelta',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  validations: {
    email_recipients: {
      required
    },
    time: {
      required
    }
  },
  components: {
    BaseAppBarHeader,
    LayoutFixedScrollable,
    Multiselect,
    BaseButton,
    BaseTimePicker,
    EmailPreview,
    RearrangeIcon
  },
  data() {
    return {
      recipientsIsDirthy: false,
      to_query: ''
    };
  },
  computed: {
    ...mapGetters('email', [
      'get_email_recipients',
      'get_schedule_time',
      'get_selected_jumpstart',
      'get_selected_articles',
      'get_email_date'
    ]),
    ...mapGetters('recipient', ['get_recipients_available']),
    email_recipients: {
      get() {
        return this.get_email_recipients;
      },
      set(value) {
        this.update_email_recipients(value);
      }
    },
    time: {
      get() {
        return this.get_schedule_time;
      },
      set(value) {
        this.update_schedule_time(value);
      }
    }
  },
  methods: {
    ...mapMutations('email', ['update_email_recipients', 'update_schedule_time']),
    ...mapActions('recipient', ['fetch_recipients']),
    ...mapActions('email', ['update_selected_articles']),
    onToSearchChange(query) {
      this.to_query = query;
    },
    updateBlueDelta() {
      let total_time = new Date(this.get_email_date + this.get_schedule_time).toISOString();
      const params = {
        jumpStartId: this.get_selected_jumpstart.id,
        body: {
          dateTime: total_time,
          articleIds: this.get_selected_articles.map(article => article.id),
          distributionGroups: this.get_email_recipients
        }
      };
      this.update_selected_articles({ params }).catch(error => {
        this.update_response_message({
          message: error.response.data.message,
          type: 'error',
          class: 'text-error'
        });
      });
    }
  },
  mounted() {
    this.fetch_recipients();
  }
};
</script>
