<template>
  <LayoutFixedScrollable>
    <template #header>
      <BaseAppBarHeader title="New Memo" :to-link="{ name: 'Dashboard' }" />
    </template>
    <template #content>
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
              <p class="mb-2"><b>Date:</b> {{ date }}</p>
              <p class="mb-2">{{ to }}</p>
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
        </div>
      </div>
    </template>
  </LayoutFixedScrollable>
</template>

<script>
import LayoutFixedScrollable from '@/components/LayoutFixedScrollable';
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import BaseInputText from '@/components/BaseInputText.vue';
import BaseEditor from '@/components/Editor/BaseEditor.vue';
import BaseButton from '@/components/BaseButton.vue';
import PDFUpload from '@/components/PDFUpload';
import Multiselect from 'vue-multiselect';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { sleep } from '@/helpers.js';

export default {
  name: 'MemoAdd',
  components: {
    LayoutFixedScrollable,
    BaseAppBarHeader,
    BaseInputText,
    BaseEditor,
    BaseButton,
    PDFUpload,
    Multiselect
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
  data: () => ({
    to_query: '',
    showResult: false,
    pdfFileInfo: {},
    optionsCarousel: {
      dots: true,
      navButtons: false
    }
  }),
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
  mounted() {
    this.fetch_recipients();
  },
  methods: {
    ...mapActions('memo', ['add_memo']),
    ...mapActions('recipient', ['fetch_recipients']),
    ...mapMutations('memo', [
      'update_to',
      'update_description',
      'update_date',
      'update_subject',
      'update_recipients',
      'update_response_message'
    ]),
    onToSearchChange(query) {
      this.to_query = query;
    },
    updatePdfFiles(result) {
      this.pdfFileInfo = result;
    },
    submit() {
      if (!this.pdfFileInfo.url) {
        alert('No pdf attached.');
        return;
      }

      const params = {
        body: {
          pdfUrl: this.pdfFileInfo.url,
          date: this.get_date,
          description: this.get_description,
          to: this.get_to,
          subject: this.get_subject,
          distributionGroups: this.get_recipients
        }
      };
      this.add_memo({ params })
        .then(() => {
          this.$store.dispatch('memo/clear_form_data');
          this.onSuccessSubmit();
        })
        .catch(error => {
          this.update_response_message({
            message: error.response.data.title,
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
        name: 'Dashboard'
      });

      this.$store.commit('overlay/updateModel', {
        title: '',
        message: ''
      });
    }
  }
};
</script>
