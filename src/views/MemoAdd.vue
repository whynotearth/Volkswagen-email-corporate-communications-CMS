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
                src="https://res.cloudinary.com/die9ji2vn/image/upload/v1603095054/vk-new-logo_ik4ew5.png"
                alt=""
                class="h-10 md:h-20 mr-2"
              />
            </div>
            <hr />
            <div class="p-4 body-1-mobile">
              <p class="mb-2"><b>Date:</b> {{ date }}</p>
              <p class="mb-2">{{ to }}</p>
              <p class="mb-2 preview-description" v-html="descriptionStyling"></p>
              <div
                class="w-full tg-body-mobile text-center text-black em-high whitespace-pre-line break-words flex-grow order-2 md:w-1/3 m-auto"
              >
                <PDFUpload class="text-center" @change="updatePdfFiles" :settings-carousel="optionsCarousel" />
                <span v-if="error.enabled" class="text-error pl-error-message">
                  {{ error.message }}
                </span>
              </div>
            </div>
          </div>

          <p v-if="get_response_message.message" class="font-bold py-6 text-left" :class="get_response_message.class">
            {{ get_response_message.message }}
          </p>

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
import marked from 'marked';
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
    error: {
      enabled: false,
      message: ''
    },
    optionsCarousel: {
      infinite: false,
      initialSlide: 0,
      dots: true,
      navButtons: false
    }
  }),
  computed: {
    ...mapGetters('memo', [
      'get_to',
      'get_subject',
      'get_date',
      'get_description',
      'get_recipients',
      'get_response_message'
    ]),
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
    },
    descriptionStyling() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      });
      return marked(this.description);
    }
  },
  mounted() {
    this.fetch_recipients();
  },
  destroyed() {
    this.update_to('');
    this.update_subject('');
    this.update_description('');
    this.update_date('');
    this.update_recipients([]);
    this.update_response_message({
      message: '',
      type: '',
      class: ''
    });
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
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }

      if (!this.pdfFileInfo.url) {
        this.error = {
          enabled: true,
          message: 'PDF file is required'
        };
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

<style>
.preview-description a {
  color: #1972b3;
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin: 0;
  margin-bottom: 0;
  padding: 0;
  text-align: left;
  text-decoration: none;
}
.preview-description ol {
  list-style: decimal;
}
.preview-description ul {
  list-style: disc;
}
.preview-description ol,
.preview-description ul {
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  list-style-position: inside;
  margin: 0 !important;
  margin-bottom: 8px !important;
  padding: 0 !important;
}
.preview-description ol li,
.preview-description ul li {
  color: #000;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  white-space: pre-line;
  word-break: break-word;
}
.preview-description p,
.preview-description blockquote {
  color: #000;
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  margin: 0;
  margin-bottom: 0;
  padding: 0;
  text-align: left;
  white-space: pre-line;
  word-break: break-word;
}
.preview-description h1 {
  color: inherit;
  font-family: Arial, sans-serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 27px;
  margin: 0 !important;
  margin-bottom: 26px !important;
  padding: 0;
  text-align: left;
  word-wrap: normal;
}
.preview-description strong {
  color: #1972b3;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
}
</style>
