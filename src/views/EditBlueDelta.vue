<template>
  <LayoutFixedScrollable>
    <template #content>
      <div class="">
        <BaseAppBarHeader
          class="sticky top-0 bg-white"
          :title="formatDate(get_email_date, 'EEEE, d MMM, yyyy')"
          :to-link="{ name: 'JumpStartLists' }"
        />
        <div class="flex mb-40">
          <div class="container px-0 md:px-6 pt-4 px-4">
            <div class="relative my-4">
              <div class="w-full">
                <EmailPreview />
              </div>
              <router-link
                :to="{ name: 'BlueDeltaRearrange', params: { id: id } }"
                class="absolute bg-opacity-50 bg-black -mx-4 md:m-0 inset-0 text-white"
              >
                <div class="flex h-full bg-transparent justify-center items-center">
                  <RearrangeIcon />
                  <span class="ml-4 em-high uppercase tg-color-label-mobile leading-normal">REARRANGE</span>
                </div>
              </router-link>
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
            <div class="text-left">
              <BaseTimePicker v-model="$v.time.$model" :emailDate="get_email_date" @blur="$v.time.$touch()" />
              <span v-if="$v.time.$error" class="text-xs text-error">
                Please schedule time.
              </span>
            </div>
            <div class="md:px-12 py-4">
              <BaseButton @selectButton="updateBlueDelta" class="w-full sm:w-1/2" bgType="secondary">Save</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { sleep, formatDate } from '@/helpers.js';

import BaseButton from '@/components/BaseButton.vue';
import BaseTimePicker from '@/components/BaseTimePicker.vue';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import NavigationBottom from '@/components/BaseNavigationBottom';
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
    RearrangeIcon,
    NavigationBottom
  },
  data() {
    return {
      to_query: ''
    };
  },
  mounted() {
    if (!this.id || this.get_email_date === null) this.$router.push({ name: 'JumpStartLists' });
    this.fetch_recipients();
    this.update_preview_link();
  },
  computed: {
    ...mapGetters('email', ['get_email_recipients', 'get_schedule_time', 'get_selected_articles', 'get_email_date']),
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
    ...mapActions('email', ['create_jumpstart', 'update_preview_link', 'clear_email_data']),
    formatDate,
    onToSearchChange(query) {
      this.to_query = query;
    },
    updateBlueDelta() {
      this.$v.$touch();
      if (this.$v.$invalid) return false;
      let d = new Date(this.get_email_date);
      d.setHours(0, 0, 0, 0);
      let total_time = new Date(d.getTime() + this.time).toISOString();
      const params = {
        jumpStartId: this.id,
        body: {
          id: this.id,
          articleIds: this.get_selected_articles.filter(article => article.isActive).map(article => article.id),
          dateTime: this.time ? total_time : this.get_email_date,
          distributionGroups: this.get_email_recipients
        }
      };
      this.create_jumpstart({ params })
        .then(() => {
          this.clear_email_data();
          this.onSuccessSubmit();
        })
        .catch(error => {
          this.update_response_message({
            message: error.response.data.message,
            type: 'error',
            class: 'text-error'
          });
        });
    },
    async onSuccessSubmit() {
      this.$store.commit('overlay/updateModel', {
        title: 'Success!',
        message: ''
      });

      await sleep(1000);

      await this.$router.push({
        name: 'JumpStartLists'
      });

      this.$store.commit('overlay/updateModel', {
        title: '',
        message: ''
      });
    }
  }
};
</script>
