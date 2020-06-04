<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader title="Blue Delta Settings" :to-link="{ name: 'Settings' }"></BaseAppBarHeader>
    </template>
    <template #content>
      <div class="relative">
        <div class="container px-0 md:px-6">
          <div class="flex justify-between text-left py-6 px-4 mt-2">
            <div class="">Send email automatically</div>
            <BaseToggleSwitch :value="enableAutoSend" @toggleSwitch="toggleSwitch" />
          </div>
          <hr />
          <template v-if="enableAutoSend">
            <div class="text-left py-6 px-4 pb-0">
              <p class="mb-6">
                By default, Blue Delta will automatically send each day according to the below details. You can change
                these manually for each individual Blue Delta
                <router-link class="text-secondary underline" :to="{ name: 'JumpStartLists' }">here</router-link>.
              </p>
            </div>

            <div
              class="px-4 bg-white pb-0 text-left"
              :class="[
                {
                  'is-query-empty': to_query === '',
                  'is-filled': !$v.distributionGroups.$invalid,
                  error: $v.distributionGroups.$error
                },
                $v.distributionGroups.$error
                  ? 'text-red-600 border-red-600 pl-error-message'
                  : 'text-gray-500 border-gray-600'
              ]"
            >
              <label
                class="multiselect--material-label absolute"
                v-if="!$v.distributionGroups.$invalid"
                for="distributionGroups"
              >
                Default Distribution List:
              </label>
              <Multiselect
                id="distributionGroups"
                v-model="$v.distributionGroups.$model"
                :placeholder="$v.distributionGroups.$invalid ? 'Distribution List' : ''"
                :options="get_recipients_available"
                :multiple="true"
                :hide-selected="true"
                :show-labels="false"
                @search-change="onToSearchChange"
              >
                <template v-slot:noResult>Nothing found</template>
                <template v-slot:noOptions>No options available</template>
              </Multiselect>
              <span v-if="$v.distributionGroups.$error" class="text-xs text-error text-left pl-error-message">
                Distribution Groups is required
              </span>
            </div>

            <div class="flex relative my-4">
              <div class="flex-auto">
                <BaseDropdown
                  class="text-left border-t"
                  placeholder="Schedule time"
                  :options="time_slots"
                  v-model="$v.sendTime.$model"
                >
                  <template #title="{ selectedOption }">
                    <span v-if="time_slots.length === 0" class="text-gray-500">
                      No time slots!
                    </span>
                    <span v-else-if="selectedOption">
                      Schedule
                      <span class="ml-2 em-medium">
                        {{ millisecondToTime(selectedOption) }}
                      </span>
                    </span>
                  </template>
                  <template #option="{ option }">
                    <span>
                      {{ millisecondToTime(option) }}
                    </span>
                  </template>
                </BaseDropdown>
              </div>
              <p v-if="$v.sendTime.$error" class="text-xs text-error pl-error-message">
                Please select time.
              </p>
            </div>
            <p v-if="get_response_message.message" class="font-bold px-4 mb-4" :class="get_response_message.class">
              {{ get_response_message.message }}
            </p>

            <div class="px-12 max-w-sm mx-auto pt-8">
              <BaseButton
                @selectButton="updateSettings"
                class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile mb-6"
              >
                SAVE
              </BaseButton>
            </div>
          </template>
        </div>
      </div>
    </template>

    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader';
import BaseDropdown from '@/components/BaseDropdown';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import LayoutFixedFooter from '@/components/LayoutFixedFooter';
import NavigationBottom from '@/components/BaseNavigationBottom';
import BaseButton from '@/components/BaseButton';
import BaseToggleSwitch from '@/components/BaseToggleSwitch';
import Multiselect from 'vue-multiselect';
import { sleep, formatDate } from '@/helpers.js';
import { required } from 'vuelidate/lib/validators';
import { getTime } from 'date-fns';

export default {
  name: 'BlueDeltaSettings',
  components: {
    BaseAppBarHeader,
    BaseDropdown,
    NavigationBottom,
    LayoutFixedFooter,
    Multiselect,
    BaseButton,
    BaseToggleSwitch
  },
  validations: {
    distributionGroups: {
      required
    },
    sendTime: {
      required
    }
  },
  data: () => ({
    to_query: ''
  }),
  computed: {
    ...mapGetters('settings', [
      'get_settings',
      'get_distribution_groups',
      'get_send_time',
      'get_enable_auto_send',
      'get_response_message'
    ]),
    ...mapGetters('recipient', ['get_recipients_available']),
    distributionGroups: {
      get() {
        return this.get_distribution_groups;
      },
      set(value) {
        this.update_distribution_groups(value);
      }
    },
    sendTime: {
      get() {
        return this.timeToMillisecond(this.get_send_time);
      },
      set(value) {
        this.update_send_time(value);
      }
    },
    enableAutoSend: {
      get() {
        return this.get_enable_auto_send;
      },
      set(value) {
        return this.update_enable_auto_send(value);
      }
    },
    time_slots() {
      let time = [];
      let start = 800;
      let end = 2400;
      let startHours = Math.floor(start / 100) * 3600000;
      let endHours = Math.floor(end / 100) * 3600000;
      let startMinutes = (start % 100) * 60000;
      let endMinutes = (end % 100) * 60000;
      let startTime = startHours + startMinutes;
      let endTime = endHours + endMinutes;
      for (let i = startTime; i <= endTime; i += 900000) {
        time.push(i);
      }
      return time;
    },
    dateTimezone() {
      let now = new Date();
      return now.getTimezoneOffset() * 60000;
    }
  },
  mounted() {
    this.fetch_recipients();
    this.fetch_settings();
  },
  destroyed() {
    this.update_response_message({
      message: '',
      type: '',
      class: ''
    });
  },
  methods: {
    ...mapMutations('settings', [
      'update_distribution_groups',
      'update_send_time',
      'update_enable_auto_send',
      'update_response_message'
    ]),
    ...mapActions('recipient', ['fetch_recipients']),
    ...mapActions('settings', ['fetch_settings', 'post_settings']),
    millisecondToTime(duration) {
      // TODO: refactor this to a helper function, used this in a lot of places
      let minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      return hours + ':' + minutes;
    },
    onToSearchChange(query) {
      this.to_query = query;
    },
    toggleSwitch() {
      this.enableAutoSend = !this.enableAutoSend;
      this.update_enable_auto_send(this.enableAutoSend);
      this.updateEnabledAutoSend();
    },
    timeToMillisecond(value) {
      // value is like '08:00'
      if (typeof value === 'string') {
        const hoursMillisecond = parseInt(value.split(':')[0]) * 3600 * 1000;
        const minuteMillisecond = parseInt(value.split(':')[1]) * 60 * 1000;
        return hoursMillisecond + minuteMillisecond - this.dateTimezone;
      }
      return value;
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
    },
    async onCatchSubmit(error) {
      let message = 'An error occured!';
      try {
        message = error.response.data.title;
      } catch (error) {
        //
      }

      this.update_response_message({
        message: message,
        type: 'error',
        class: 'text-error'
      });
    },
    updateEnabledAutoSend() {
      const params = {
        body: {
          enableAutoSend: this.enableAutoSend
        }
      };
      this.post_settings({ params }).catch(error => {
        this.onCatchSubmit(error);
      });
    },
    updateSettings() {
      if (this.$v.$invalid) return false;
      // if user not change send time
      if (isNaN(this.get_send_time)) {
        this.update_send_time(this.timeToMillisecond(this.get_send_time));
      }
      const time = this.millisecondToTime(this.get_send_time + this.dateTimezone);
      const params = {
        body: {
          distributionGroups: this.get_distribution_groups,
          enableAutoSend: this.get_enable_auto_send,
          sendTime: time
        }
      };
      this.post_settings({ params })
        .then(() => {
          this.onSuccessSubmit();
        })
        .catch(error => {
          this.onCatchSubmit(error);
        });
    },
    formatDate
  }
};
</script>
