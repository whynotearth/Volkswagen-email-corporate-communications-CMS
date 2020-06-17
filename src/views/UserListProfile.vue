<template>
  <LayoutFixedFooter>
    <template #header>
      <BaseAppBarHeader
        title="User Profile"
        :to-link="{ name: 'UserList', params: { groupName: $route.params.groupName } }"
      ></BaseAppBarHeader>
    </template>
    <template #content>
      <div class="container px-0 md:px-6">
        <div class="bg-brand-gradient container px-0 pt-8 pb-12 bg-surface">
          <div class="tg-h1-mobile em-high text-white my-2">{{ item.firstName }} {{ item.lastName }}</div>
          <div class="tg-caption-mobile text-white em-medium">{{ item.email }}</div>
        </div>
        <div class="relative">
          <div class="bg-primary h-10 w-full absolute top-0 right-0 -z-1"></div>
          <div class="text-left bg-surface shadow-1dp rounded-xlg px-2 py-6 mx-3">
            <BaseInputText
              class="bg-surface mb-4"
              label="First Name"
              type="text"
              v-model="$v.firstName.$model"
              :error="$v.firstName.$error"
            >
              <span v-if="$v.firstName.$error" class="text-xs text-error pl-error-message">
                First Name is required
              </span>
            </BaseInputText>
            <BaseInputText
              class="bg-surface mb-4"
              label="Last Name"
              type="text"
              v-model="$v.lastName.$model"
              :error="$v.lastName.$error"
            >
              <span v-if="$v.lastName.$error" class="text-xs text-error pl-error-message">
                Last Name is required
              </span>
            </BaseInputText>
            <BaseInputText
              class="bg-surface"
              label="Email"
              type="email"
              v-model="$v.email.$model"
              :error="$v.email.$error"
            >
              <template v-if="$v.email.$error">
                <span v-if="!$v.email.required" class="text-xs text-error pl-error-message">
                  Email is required
                </span>
                <span v-if="!$v.email.email" class="text-xs text-error pl-error-message">
                  Please enter valid email
                </span>
              </template>
            </BaseInputText>
          </div>
        </div>

        <div class="text-left bg-surface shadow-1dp rounded-xlg mx-3 mt-6">
          <div class="bg-brand-gradient tg-h3-mobile text-white rounded-tl-xlg rounded-tr-xlg p-2">Segments</div>
          <div class="px-2 py-4">
            <div
              class="bg-white relative"
              :class="[
                {
                  'is-query-empty': to_query === '',
                  'is-filled': !$v.segments.$invalid,
                  error: $v.segments.$error
                },
                $v.segments.$error ? 'text-red-600 border-red-600' : 'text-gray-500 border-gray-600'
              ]"
            >
              <label class="multiselect--material-label absolute" v-if="!$v.segments.$invalid" for="segments"
                >Segments:</label
              >
              <Multiselect
                id="segments"
                v-model="$v.segments.$model"
                :placeholder="$v.segments.$invalid ? 'Segments:' : ''"
                :options="get_recipients_available"
                :multiple="true"
                :hide-selected="true"
                :show-labels="false"
                @blur="$v.segments.$touch()"
                @search-change="onToSearchChange"
              >
                <template v-slot:noResult>Nothing found</template>
                <template v-slot:noOptions>No options available</template>
              </Multiselect>
              <span v-if="$v.segments.$error" class="text-xs text-error pl-error-message">
                To is required
              </span>
            </div>
          </div>
        </div>

        <div class="p-4 max-w-sm mx-auto py-6">
          <BaseButton
            @selectButton="saveUser"
            class="block tg-color-label-mobile bg-secondary w-full hover:bg-blue-700 text-white
            font-bold rounded-full focus:outline-none focus:shadow-outline transition duration-100
            ease-in-out transition-all label-mobile mb-4 shadow-2dp"
          >
            Save
          </BaseButton>
          <div
            class="block text-center m-auto text-error font-bold tg-color-label-mobile label-mobile font-bold my-8 w-32 cursor-pointer"
            @click="deleteUser"
          >
            DELETE User
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </LayoutFixedFooter>
</template>

<script>
import BaseAppBarHeader from '@/components/BaseAppBarHeader.vue';
import LayoutFixedFooter from '@/components/LayoutFixedFooter';
import NavigationBottom from '@/components/BaseNavigationBottom';
import BaseButton from '@/components/BaseButton';
import BaseInputText from '@/components/BaseInputText.vue';
import Multiselect from 'vue-multiselect';
import { required, email } from 'vuelidate/lib/validators';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'UserListProfile',
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email
    },
    segments: {
      required
    }
  },
  components: { BaseAppBarHeader, NavigationBottom, LayoutFixedFooter, BaseButton, BaseInputText, Multiselect },
  data: () => ({
    to_query: '',
    item: {
      firstName: '',
      lastName: '',
      email: ''
    }
  }),
  computed: {
    ...mapGetters('recipient', ['get_recipients_available']),
    ...mapGetters('distributionGroup', [
      'get_form_first_name',
      'get_form_last_name',
      'get_form_email',
      'get_form_segments',
      'getEmails'
    ]),
    firstName: {
      get() {
        return this.get_form_first_name;
      },
      set(value) {
        this.update_form_firstname(value);
      }
    },
    lastName: {
      get() {
        return this.get_form_last_name;
      },
      set(value) {
        this.update_form_lastname(value);
      }
    },
    email: {
      get() {
        return this.get_form_email;
      },
      set(value) {
        this.update_form_email(value);
      }
    },
    segments: {
      get() {
        return this.get_form_segments;
      },
      set(value) {
        this.update_form_segments(value);
      }
    },
    groupName() {
      return this.$route.params.groupName;
    },
    groupId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.fetch_recipients();
    this.initForm();
  },
  methods: {
    ...mapMutations('distributionGroup', [
      'update_form_firstname',
      'update_form_lastname',
      'update_form_email',
      'update_form_segments'
    ]),
    ...mapActions('distributionGroup', ['editEmail', 'deleteEmail']),
    ...mapActions('recipient', ['fetch_recipients']),
    initForm() {
      this.item = this.getEmails.find(p => p.id === parseInt(this.groupId));
      if (this.item) {
        this.update_form_firstname(this.item.firstName);
        this.update_form_lastname(this.item.lastName);
        this.update_form_email(this.item.email);
        this.update_form_segments([this.groupName]);
      }
    },
    onToSearchChange(query) {
      this.to_query = query;
    },
    saveUser() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }
      const data = {
        distributionGroupName: this.groupName,
        recipientId: this.groupId,
        body: {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName
        }
      };

      this.editEmail(data).then(() => {
        this.$router.push({ name: 'EmailLists' });
      });
    },
    deleteUser() {
      this.deleteEmail({
        distributionGroupName: this.groupName,
        recipientId: this.groupId
      }).then(() => {
        this.$router.push({ name: 'EmailLists' });
      });
    }
  }
};
</script>
