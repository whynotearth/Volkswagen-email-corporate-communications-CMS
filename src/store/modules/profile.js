import { ProfileService } from '@whynotearth/meredith-axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    profile_data: {
      name: '',
      email: ''
    }
  },
  mutations: {
    update_name(state, payload) {
      Vue.set(state.profile_data.name, 'name', payload);
    },
    update_email(state, payload) {
      Vue.set(state.profile_data.email, 'email', payload);
    },
    update_profile_data(state, payload) {
      Vue.set(state, 'profile_data', payload);
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
    get_email: state => state.profile_data.email
  }
};
