import { JumpStartService } from '@whynotearth/meredith-axios';
import { BASE_API } from '@/connection/api.js';

export default {
  namespaced: true,
  state: {
    loading: false,
    email_date: null,
    schedule_time: null,
    preview_link: '',
    postIds: [],
    email_recipients: [],
    response_message: {
      type: '', // error, success
      message: '',
      class: '' // text-error text-success
    }
  },
  getters: {
    get_email_date: state => state.email_date,
    get_schedule_time: state => state.schedule_time,
    get_postIds: state => state.postIds,
    get_preview_link: state => state.preview_link,
    get_email_recipients: state => state.email_recipients,
    get_response_message: state => state.response_message
  },
  actions: {
    async create_jumpstart({ commit }, payload) {
      await JumpStartService.jumpstart(payload.params);
    },
    clear_email_data({ commit }) {
      commit('update_email_date', null);
      commit('update_schedule_time', null);
      commit('update_preview_link', '');
      commit('update_postIds'); // Passing no payload just clears the postIds array
      commit('update_email_recipients', []);
    }
  },
  mutations: {
    update_email_date(state, payload) {
      state.email_date = payload;
    },
    update_schedule_time(state, payload) {
      state.schedule_time = payload;
    },
    update_postIds(state, payload) {
      if (!payload) {
        state.postIds.splice(0, state.postIds.length);
      } else {
        let i = state.postIds.indexOf(payload);
        i !== -1 ? state.postIds.splice(i, 1) : state.postIds.push(payload);
      }
    },
    update_preview_link(state, payload) {
      state.preview_link = '';
      if (payload === '') return false;
      const base = `${BASE_API}/api/v0/volkswagen/jumpstart/preview`;
      const url = new URL(base);
      state.postIds.forEach(postId => {
        url.searchParams.append('postIds', postId);
      });
      state.preview_link = url.href;
    },
    update_email_recipients(state, payload) {
      state.email_recipients = payload;
    },
    update_response_message(state, payload) {
      state.response_message = payload;
    }
  }
};
