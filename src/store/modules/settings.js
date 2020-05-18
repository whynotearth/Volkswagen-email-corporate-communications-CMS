import { SettingsService } from '@whynotearth/meredith-axios';
import { BASE_API } from '@/connection/api.js';

export default {
  namespaced: true,
  state: {
    settings: {},
    distribution_groups: [],
    enable_auto_send: false,
    send_time: '',
    response_message: ''
  },
  getters: {
    get_settings: state => state.settings,
    get_distribution_groups: state => state.distribution_groups,
    get_enable_auto_send: state => state.enable_auto_send,
    get_send_time: state => state.send_time,
    get_response_message: state => state.response_message
  },
  mutations: {
    update_settings(state, payload) {
      state.settings = payload;
    },
    update_distribution_groups(state, payload) {
      state.distribution_groups = payload;
    },
    update_enable_auto_send(state, payload) {
      state.enable_auto_send = payload;
    },
    update_send_time(state, payload) {
      state.send_time = payload;
    },
    update_response_message(state, payload) {
      state.response_message = payload;
    }
  },
  actions: {
    async fetch_settings({ commit }) {
      const data = await SettingsService.settings();
      commit('update_settings', data);
      commit('update_distribution_groups', data.distributionGroups);
      commit('update_enable_auto_send', data.enableAutoSend);
      commit('update_send_time', data.sendTime);
    },
    async post_settings({ commit }, payload) {
      await SettingsService.settings1(payload.params);
    }
  }
};
