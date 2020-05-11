<template>
  <LayoutFixedScrollable>
    <template #content>
      <div>
        <BaseAppBarHeader title="Blue Delta Settings" :to-link="{ name: 'Settings' }" />

        <div class="container px-0 md:px-6">
          <div class="text-left py-6 px-4 pb-0">
            <p class="mb-6">
              By default, Blue Delta will automatically send each day according to the below details. You can change
              these manually for each individual Blue Delta
              <router-link class="text-secondary underline" to="/admin/blue-delta">here</router-link>.
            </p>
          </div>

          <div
            class="px-4 bg-white pb-0 text-left"
            :class="[
              {
                'is-query-empty': to_query === '',
                'is-filled': !$v.default_distribution_list.$invalid,
                error: $v.default_distribution_list.$error
              },
              $v.default_distribution_list.$error ? 'text-red-600 border-red-600' : 'text-gray-500 border-gray-600'
            ]"
          >
            <label
              class="multiselect--material-label absolute"
              v-if="!$v.default_distribution_list.$invalid"
              for="default_distribution_list"
            >
              Default Distribution List:
            </label>
            <Multiselect
              id="default_distribution_list"
              v-model="$v.default_distribution_list.$model"
              :placeholder="$v.default_distribution_list.$invalid ? 'Distribution List' : ''"
              :options="get_recipients_available"
              :multiple="true"
              :hide-selected="true"
              :show-labels="false"
              @search-change="onToSearchChange"
            >
              <template v-slot:noResult>Nothing found</template>
              <template v-slot:noOptions>No options available</template>
            </Multiselect>
            <span v-if="$v.default_distribution_list.$error" class="text-xs text-error text-left">
              Default Distribution List is required
            </span>
          </div>
        </div>

        <div class="container flex-col mt-8 py-6">
          <div class="relative border-top">
            <div class="flex-auto">
              <BaseDropdown
                class="text-left"
                placeholder="Schedule time"
                :options="time_slots"
                v-model="$v.default_schedule_time.$model"
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
            <p v-if="$v.default_schedule_time.$error" class="text-xs text-error">
              Please select time.
            </p>
          </div>
        </div>

        <div class="py-6 max-w-sm mx-auto px-12">
          <BaseButton
            class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile mb-6"
          >
            SAVE
          </BaseButton>
        </div>
      </div>
    </template>

    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedScrollable>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader';
import BaseDropdown from '@/components/BaseDropdown';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import NavigationBottom from '@/components/BaseNavigationBottom';
import BaseButton from '@/components/BaseButton';
import Multiselect from 'vue-multiselect';
import { formatDate } from '@/helpers.js';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'BlueDeltaSettings',
  components: {
    BaseAppBarHeader,
    BaseDropdown,
    NavigationBottom,
    LayoutFixedScrollable,
    Multiselect,
    BaseButton
  },
  validations: {
    default_distribution_list: {
      required
    },
    default_schedule_time: {
      required
    }
  },
  data: () => ({
    to_query: '',
    selected_hour: new Date()
  }),
  computed: {
    ...mapGetters('recipient', ['get_recipients_available']),
    ...mapGetters('email', ['get_default_distribution_groups', 'get_email_date', 'get_default_schedule_time']),
    default_distribution_list: {
      get() {
        return this.get_default_distribution_groups;
      },
      set(value) {
        this.update_default_distribution_groups(value);
      }
    },
    default_schedule_time: {
      get() {
        return this.get_default_schedule_time;
      },
      set(value) {
        this.update_default_schedule_time(value);
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
    }
  },
  mounted() {
    this.fetch_recipients();
  },
  methods: {
    ...mapMutations('email', ['update_default_distribution_groups', 'update_default_schedule_time']),
    ...mapActions('recipient', ['fetch_recipients']),
    millisecondToTime(duration) {
      let minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      return hours + ':' + minutes;
    },
    onToSearchChange(query) {
      this.to_query = query;
    },
    formatDate
  }
};
</script>

<style scoped>
.border-top {
  border-top: 1px solid #e2e8f0;
}
</style>
