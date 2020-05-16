import { ProfileService } from '@whynotearth/meredith-axios';

export default {
  namespaced: true,
  state: {
    profile_data: {
      name: '',
      email: ''
    },
    response_message: {
      type: '', // error, success
      message: '',
      class: '' // text-error text-success
    }
  },
  mutations: {
    update_name(state, payload) {
      state.profile_data.name = payload;
    },
    update_email(state, payload) {
      state.profile_data.email = payload;
    },
    update_profile_data(state, payload) {
      state.profile_data = payload;
    },
    update_response_message(state, payload) {
      state.response_message = payload;
    }
  },
  actions: {
    async update_profile(context, payload) {
      await ProfileService.profile1(payload.params);
    },
    async fetch_profile(context, payload) {
      const data = await ProfileService.profile();
      context.commit('update_profile_data', data);
    }
  },
  getters: {
    get_name: state => state.profile_data.name,
    get_email: state => state.profile_data.email,
    get_response_message: state => state.response_message
  }
};
