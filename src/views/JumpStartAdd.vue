<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader title="New Jumpstart" :to-link="{ name: 'Dashboard' }" />
    </template>
    <template #content>
      <div class="flex-grow text-left">
        <div class="container px-0 md:px-6 pt-4 px-4 bg-background">
          <BaseDropdown
            class="relative bg-surface text-left border rounded mb-4 border-gray-600"
            :dropdownContainerClasses="'dropdown-border-0 py-3 px-3'"
            :optionContainerClasses="'mt-0 pt-0'"
            placeholder="Schedule time"
            :options="dates"
            @updateSelectedOption="updateSubjectInput()"
            v-model="$v.date.$model"
          >
            <template #title="{ selectedOption }">
              <span v-if="dates.length === 0" class="text-gray-500">
                No time slots!
              </span>
              <span v-else-if="selectedOption" class="ml-2 text-black">
                {{ formatDate(selectedOption) }}
              </span>
            </template>
            <template #option="{ option }">
              <span>
                {{ formatDate(option) }}
              </span>
            </template>
          </BaseDropdown>
          <template v-if="get_email_date">
            <BaseDropdown
              class="relative bg-surface text-left border rounded mb-4 border-gray-600"
              :options="time_slots"
              :dropdownContainerClasses="'dropdown-border-0 py-3 px-3'"
              :optionContainerClasses="'mt-0 pt-0'"
              v-model="$v.time.$model"
            >
              <template #title="{ selectedOption }">
                <span v-if="time_slots.length === 0" class="text-gray-500">
                  No time slots!
                </span>
                <span v-else>
                  <span v-if="selectedOption" class="ml-2 text-black">
                    {{ millisecondToTime(selectedOption) }}
                  </span>
                  <span class="text-gray-500" v-else>
                    No time selected
                  </span>
                </span>
              </template>
              <template #option="{ option }">
                <span>
                  {{ millisecondToTime(option) }}
                </span>
              </template>
            </BaseDropdown>

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

            <div
              class="mb-4 bg-white relative"
              :class="[
                {
                  'is-query-empty': to_query === '',
                  'is-filled': !$v.audience.$invalid,
                  error: $v.audience.$error
                },
                $v.audience.$error ? 'text-red-600 border-red-600' : 'text-gray-500 border-gray-600'
              ]"
            >
              <label class="multiselect--material-label absolute" v-if="!$v.audience.$invalid" for="audience"
                >Audience:</label
              >
              <Multiselect
                id="audience"
                v-model="$v.audience.$model"
                :placeholder="$v.audience.$invalid ? 'Audience:' : ''"
                :options="get_recipients_available"
                :multiple="true"
                :hide-selected="true"
                :show-labels="false"
                @blur="$v.audience.$touch()"
                @search-change="onToSearchChange"
              >
                <template v-slot:noResult>Nothing found</template>
                <template v-slot:noOptions>No options available</template>
              </Multiselect>
              <span v-if="$v.audience.$error" class="text-xs text-error pl-error-message">
                To is required
              </span>
            </div>

            <div
              class="mb-4 bg-white relative"
              :class="[
                {
                  'is-filled': !$v.tags.$invalid,
                  error: $v.tags.$error
                },
                $v.tags.$error ? 'text-red-600 border-red-600' : 'text-gray-500 border-gray-600'
              ]"
            >
              <label class="multiselect--material-label absolute" v-if="!$v.tags.$invalid" for="tags">Tags:</label>
              <Multiselect
                id="tags"
                v-model="$v.tags.$model"
                :placeholder="$v.tags.$invalid ? 'Tags:' : ''"
                :multiple="true"
                :hide-selected="true"
                :options="[]"
                :show-labels="false"
                :taggable="true"
                @tag="addTag"
                @blur="$v.tags.$touch()"
              >
                <template v-slot:noResult>Nothing found</template>
                <template v-slot:noOptions>No options available</template>
              </Multiselect>
              <span v-if="$v.tags.$error" class="text-xs text-error pl-error-message">
                To is required
              </span>
            </div>

            <BaseEditor
              class="body-1-mobile bg-surface"
              v-model="$v.description.$model"
              placeholder="Jumpstart Body"
              :error="$v.description.$dirty && !$v.description.required"
            >
              <span
                v-if="$v.description.$dirty && !$v.description.required"
                class="text-xs text-error pl-error-message"
              >
                Description is required
              </span>
            </BaseEditor>

            <div class="h-full overflow-y-auto">
              <div class="p-4 flex items-center">
                <img
                  src="https://res.cloudinary.com/whynotearth/image/upload/v1586844643/Volkswagen/cms/logo_tjf9ej.svg"
                  alt=""
                  class="h-8 mr-2"
                />
                <span class="font-semibold text-2xs text-blue-900">Chattanooga</span>
              </div>
              <hr />
              <div class="p-4 body-1-mobile">
                <p class="mb-2"><b>Date:</b> {{ formatDate(date) }}</p>
                <p class="mb-2">{{ audience[0] }}</p>
                <div
                  class="w-full tg-body-mobile text-center text-black em-high whitespace-pre-line break-words flex-grow order-2"
                >
                  <PDFUpload class="text-center" @change="updatePdfFiles" :settings-carousel="optionsCarousel" />
                </div>
              </div>
            </div>

            <div class="my-6 text-center">
              <BaseButton @selectButton="submit" class="w-64" bgType="secondary"> Save </BaseButton>
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

<script>
import LayoutFixedFooter from '@/components/LayoutFixedFooter.vue';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import NavigationBottom from '@/components/BaseNavigationBottom';
import BaseEditor from '@/components/Editor/BaseEditor.vue';
import BaseInputText from '@/components/BaseInputText.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseDropdown from '@/components/BaseDropdown';
import PDFUpload from '@/components/PDFUpload';
import Multiselect from 'vue-multiselect';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { sleep, formatDate } from '@/helpers.js';
import { mustBeDate } from '@/validations.js';
import { isToday, parseISO } from 'date-fns';

export default {
  name: 'JumpStartForm',
  components: {
    LayoutFixedFooter,
    BaseAppBarHeader,
    NavigationBottom,
    BaseInputText,
    BaseDropdown,
    BaseButton,
    Multiselect,
    BaseEditor,
    PDFUpload
  },
  validations: {
    subject: {
      required
    },
    date: {
      mustBeDate: value => mustBeDate({ value })
    },
    audience: {
      required
    },
    time: {
      required
    },
    tags: {
      required
    },
    description: {
      required
    }
  },
  computed: {
    ...mapGetters('email', [
      'get_email_recipients',
      'get_schedule_time',
      'get_selected_articles',
      'get_email_date',
      'get_response_message',
      'get_subject',
      'get_tags',
      'get_description'
    ]),
    ...mapGetters('recipient', ['get_recipients_available']),
    time: {
      get() {
        return this.get_schedule_time;
      },
      set(value) {
        this.update_schedule_time(value);
      }
    },
    date: {
      get() {
        return this.get_email_date;
      },
      set(value) {
        this.update_email_date(value);
      }
    },
    audience: {
      get() {
        return this.get_email_recipients;
      },
      set(value) {
        this.update_email_recipients(value);
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
    tags: {
      get() {
        return this.get_tags;
      },
      set(value) {
        this.update_tags(value);
      }
    },
    dates() {
      let d = new Date();
      let dtzOffset = d.getTimezoneOffset() * 60000;
      d.setHours(0, 0, 0, 0);
      d = d.getTime();
      let days = [];
      for (let i = 0; i < 30; i++) {
        let a = d - dtzOffset + i * 86400000;
        days.push(new Date(a));
      }
      return days;
    },
    time_slots() {
      let time = [];
      if (this.get_email_date) {
        let d = new Date(this.get_email_date);
        let start = 800;
        let end = 2400;
        let startHours = Math.floor(start / 100) * 3600000;
        let endHours = Math.floor(end / 100) * 3600000;
        let startMinutes = (start % 100) * 60000;
        let endMinutes = (end % 100) * 60000;
        let startTime = startHours + startMinutes;
        let endTime = endHours + endMinutes;
        d.setHours(0, 0, 0, 0);
        if (Date.now() > d.getTime()) startTime = Date.now() - d.getTime() + 900000;
        for (let i = startTime; i <= endTime; i += 900000) {
          time.push(i);
        }
      }
      return time;
    }
  },
  data() {
    return {
      to_query: '',
      pdfFileInfo: {},
      optionsCarousel: {
        dots: true,
        navButtons: false
      }
    };
  },
  mounted() {
    this.fetch_recipients();
  },
  methods: {
    ...mapMutations('email', [
      'update_email_recipients',
      'update_schedule_time',
      'update_email_date',
      'update_response_message',
      'update_description',
      'update_subject',
      'update_tags'
    ]),
    ...mapActions('recipient', ['fetch_recipients']),
    ...mapActions('email', ['create_jumpstart', 'update_preview_link', 'clear_email_data']),
    formatDate,
    onToSearchChange(query) {
      this.to_query = query;
    },
    addTag(tag) {
      let tags = this.get_tags;
      tags.push(tag);
      this.update_tags(tags);
    },
    updateSubjectInput(value) {
      const date = this.formatDate(this.get_email_date);
      this.update_subject(date);
    },
    millisecondToTime(duration) {
      let minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      return hours + ':' + minutes;
    },
    updatePdfFiles(result) {
      this.pdfFileInfo = result;
    },
    submit() {
      const data = {
        date: this.get_email_date,
        time: this.get_schedule_time,
        distributionGroups: this.get_email_recipients,
        subject: this.get_subject,
        audience: this.get_audience,
        description: this.get_description,
        files: this.pdfFileInfo
      };

      console.log(data);
    }
  }
};
</script>
