import { SettingsService } from '@whynotearth/meredith-axios';
import { BASE_API } from '@/connection/api.js';

export default {
  namespaced: true,
  state: {
    settings: {}
  },
  getters: {
    get_settings: state => state.settings
  },
  mutations: {
    update_email_date(state, payload) {
      state.settings = payload;
    }
  },
  actions: {
    async fetch_settings({ commit }) {
      const data = await SettingsService.settings();
      commit.update_email_date(data);
    },
    async post_settings({ commit }, payload) {
      await SettingsService.settings1(payload);
    }
  }
};
