import { JumpStartService } from '@whynotearth/meredith-axios';
import { BASE_API } from '@/connection/api.js';
import { debounce } from 'lodash-es';

export default {
  namespaced: true,
  state: {
    loading: false,
    email_date: null,
    schedule_time: null,
    preview_link: '',
    selected_posts: [],
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
    get_selected_posts: state => state.selected_posts,
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
      commit('update_selected_posts'); // Passing no payload just clears the selected_posts array
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
    update_selected_posts(state, payload) {
      if (!payload) {
        state.selected_posts.splice(0, state.selected_posts.length);
      } else {
        let i = state.selected_posts.indexOf(payload);
        i !== -1 ? state.selected_posts.splice(i, 1) : state.selected_posts.push(payload);
      }
    },
    update_preview_link(state, payload) {
      if (payload === '') {
        state.preview_link = payload;
        return false;
      }
      const base = `${BASE_API}/api/v0/volkswagen/jumpstart/preview`;
      const url = new URL(base);
      state.selected_posts.forEach(post => {
        url.searchParams.append('postIds', post.id);
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
