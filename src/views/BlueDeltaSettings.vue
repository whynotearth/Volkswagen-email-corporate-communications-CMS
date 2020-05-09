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
            class="px-4 bg-white pb-0 pl-error-message"
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
            <span v-if="$v.default_distribution_list.$error" class="text-xs text-error pl-error-message">
              Default Distribution List is required
            </span>
          </div>
        </div>

        <div class="container flex flex-col mt-8">
          <div class="flex items-strech items-center border-b-1 border-divider bg-surface" @click="toggleDropdown()">
            <div
              class="container relative md:px-6 block flex-grow justify-between flex h-full items-center select-none px-4 pr-6 py-5 border-top"
            >
              <span class="tg-body-mobile">
                Time
                <span class="ml-2 text-black em-medium">
                  {{ formatDate(selected_hour, 'p') }}
                </span>
              </span>
              <ArrowDown class="transform scale-x-1 text-gray" :class="{ 'transform rotate-180': isOpenDropdown }" />
              <ul v-if="isOpenDropdown" class="absolute menu shadow-8dp mx-2 md:mx-6 z-10 py-2">
                <li class="text-left" v-for="(hour, index) in hours" :key="index" @click="get_selected_hour(hour)">
                  <div class="tg-body-mobile p-4 block w-full cursor-pointer">
                    {{ formatDate(hour, 'p') }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="py-6 max-w-sm mx-auto px-12">
          <BaseButton
            class="block bg-secondary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out transition-all label-mobile mb-6">
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import NavigationBottom from '@/components/BaseNavigationBottom';
import BaseButton from '@/components/BaseButton';
import ArrowDown from '@/assets/arrow-down.svg';
import Multiselect from 'vue-multiselect';
import { formatDate } from '@/helpers.js';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'BlueDeltaSettings',
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedScrollable, Multiselect, ArrowDown, BaseButton },
  validations: {
    default_distribution_list: {
      required
    }
  },
  data: () => ({
    to_query: '',
    isOpenDropdown: false,
    selected_hour: new Date()
  }),
  computed: {
    ...mapGetters('distributionGroup', ['getEmailLists']),
    ...mapGetters('recipient', ['get_recipients_available']),
    default_distribution_list: {
      get() {
        return this.getEmailLists;
      },
      set(value) {
        this.updateEmailLists(value);
      }
    },
    recipients: {
      get() {
        return this.get_recipients;
      },
      set(value) {
        this.update_recipients(value);
      }
    },
    hours() {
      let hours = [];
      for (let i = 0; i < 24; i++) {
        hours.push(new Date(0, 0, 0, i));
      }
      return hours;
    }
  },
  mounted() {
    this.fetch_recipients();
  },
  methods: {
    ...mapMutations('distributionGroup', ['updateEmailLists']),
    ...mapActions('recipient', ['fetch_recipients']),
    onToSearchChange(query) {
      this.to_query = query;
    },
    formatDate,
    toggleDropdown() {
      this.isOpenDropdown = !this.isOpenDropdown;
    },
    get_selected_hour(hour) {
      this.selected_hour = hour;
    }
  }
};
</script>

<style scoped>
.menu {
  height: 224px;
  top: 54px;
  background: white;
  border-radius: 4px;
  right: 0;
  left: 0;
  overflow-y: scroll;
}

.active {
  background: rgba(3, 179, 249, 0.12);
}

.border-top {
  border-top: 1px solid rgb(226, 232, 240);
}

.pl-error-message {
  text-align: left;
}
</style>
