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
    articles: [],
    selected_articles: [],
    email_recipients: [],
    jumpstarts: [],
    available_articles: [],
    response_message: {
      type: '', // error, success
      message: '',
      class: '' // text-error text-success
    },
    default_distribution_groups: []
  },
  getters: {
    get_email_date: state => state.email_date,
    get_schedule_time: state => state.schedule_time,
    get_selected_jumpstart: state => state.selected_jumpstart,
    get_selected_articles: state => state.selected_articles,
    get_preview_link: state => state.preview_link,
    get_email_recipients: state => state.email_recipients,
    get_jumpstarts: state => state.jumpstarts,
    get_response_message: state => state.response_message,
    get_articles: state => state.articles,
    get_default_distribution_groups: state => state.default_distribution_groups
    get_available_articles: state => state.available_articles
  },
  actions: {
    async create_jumpstart({ commit }, payload) {
      await JumpStartService.jumpstart1(payload.params);
    },
    async fetch_jumpstarts({ commit }) {
      store.commit('loading/loading', true);
      const data = await JumpStartService.jumpstart();
      commit('update_jumpstarts', data);
      store.commit('loading/loading', false);
    },
    async fetch_available_articles({ commit }, payload) {
      const data = await JumpStartService.availablearticles(payload);
      commit('update_available_articles', data);
    },
    update_selected_articles({ state }, payload) {
      if (!payload) {
        state.selected_articles.splice(0, state.selected_articles.length);
      } else {
        let i = state.selected_articles.indexOf(payload);
        i !== -1 ? state.selected_articles.splice(i, 1) : state.selected_articles.push(payload);
      }
    },
    update_available_articles({ state, commit }, payload) {
      let i = state.available_articles.indexOf(payload);
      i !== -1 ? state.available_articles.splice(i, 1) : state.available_articles.push(payload);
    },
    update_preview_link({ state }, payload) {
      if (payload === '') {
        state.preview_link = payload;
        return false;
      }
      const base = `${BASE_API}/api/v0/volkswagen/jumpstart/${state.selected_jumpstart.id}/preview`;
      const url = new URL(base);
      state.selected_articles.forEach(article => {
        url.searchParams.append('articleIds', article.id);
      });
      state.preview_link = url.href;
    },
    clear_email_data({ commit, dispatch }) {
      commit('update_email_date', null);
      commit('update_schedule_time', null);
      commit('update_email_recipients', []);
      dispatch('update_preview_link', '');
      dispatch('update_selected_articles'); // Passing no payload just clears the selected_articles array
    },
    debounced_preview: debounce(
      function({ dispatch }) {
        dispatch('update_preview_link');
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
    update_selected_jumpstart(state, payload) {
      state.selected_jumpstart = payload;
    },
    update_email_recipients(state, payload) {
      state.email_recipients = payload;
    },
    update_response_message(state, payload) {
      state.response_message = payload;
    },
    update_articles(state, payload) {
      state.articles = payload;
    },
    update_default_distribution_groups(state, payload) {
      state.default_distribution_groups = payload;
    },
    update_available_articles(state, payload) {
      state.available_articles = payload;
    }
  }
};
