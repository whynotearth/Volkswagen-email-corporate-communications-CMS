import { JumpStartService } from '@whynotearth/meredith-axios';
import { BASE_API } from '@/connection/api.js';
import { debounce } from 'lodash-es';
import store from '@/store';

export default {
  namespaced: true,
  state: {
    loading: false,
    email_date: null,
    schedule_time: null,
    preview_link: '',
    selected_jumpstart: {},
    selected_articles: [],
    email_recipients: [],
    jumpstarts: [],
    response_message: {
      type: '', // error, success
      message: '',
      class: '' // text-error text-success
    }
  },
  getters: {
    get_email_date: state => state.email_date,
    get_schedule_time: state => state.schedule_time,
    get_selected_jumpstart: state => state.selected_jumpstart,
    get_selected_articles: state => state.selected_articles,
    get_preview_link: state => state.preview_link,
    get_email_recipients: state => state.email_recipients,
    get_jumpstarts: state => state.jumpstarts,
    get_response_message: state => state.response_message
  },
  actions: {
    async create_jumpstart({ commit }, payload) {
      await JumpStartService.jumpstart(payload.params);
    },
    async fetch_jumpstarts({ commit }) {
      store.commit('loading/loading', true);
      const data = await JumpStartService.jumpstart1();
      commit('update_jumpstarts', data);
      store.commit('loading/loading', false);
    },
    clear_email_data({ commit }) {
      commit('update_email_date', null);
      commit('update_schedule_time', null);
      commit('update_preview_link', '');
      commit('update_selected_articles'); // Passing no payload just clears the selected_articles array
      commit('update_email_recipients', []);
    },
    debounced_preview: debounce(
      function({ commit }) {
        commit('update_preview_link');
      },
      3000,
      { maxWait: 3000 }
    )
  },
  mutations: {
    update_email_date(state, payload) {
      state.email_date = payload;
    },
    update_schedule_time(state, payload) {
      state.schedule_time = payload;
    },
    update_jumpstarts(state, payload) {
      state.jumpstarts = payload;
    },
    update_selected_articles(state, payload) {
      if (!payload) {
        state.selected_articles.splice(0, state.selected_articles.length);
      } else {
        let i = state.selected_articles.indexOf(payload);
        i !== -1 ? state.selected_articles.splice(i, 1) : state.selected_articles.push(payload);
      }
    },
    update_selected_jumpstart(state, payload) {
      state.selected_jumpstart = payload;
    },
    update_preview_link(state, payload) {
      if (payload === '') {
        state.preview_link = payload;
        return false;
      }
      const base = `${BASE_API}/api/v0/volkswagen/jumpstart/${state.selected_jumpstart.id}/preview`;
      const url = new URL(base);
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
