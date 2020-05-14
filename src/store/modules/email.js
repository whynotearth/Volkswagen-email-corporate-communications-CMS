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
    articles: [],
    selected_articles: [],
    email_recipients: [],
    jumpstarts: [],
    response_message: {
      type: '', // error, success
      message: '',
      class: '' // text-error text-success
    },
    default_distribution_groups: [],
    default_schedule_time: null,
    selected_plan: {},
    daily_plan: []
  },
  getters: {
    get_email_date: state => state.email_date,
    get_schedule_time: state => state.schedule_time,
    get_selected_articles: state => state.selected_articles,
    get_preview_link: state => state.preview_link,
    get_email_recipients: state => state.email_recipients,
    get_response_message: state => state.response_message,
    get_articles: state => state.articles,
    get_default_distribution_groups: state => state.default_distribution_groups,
    get_default_schedule_time: state => state.default_schedule_time,
    get_selected_plan: state => state.selected_plan,
    get_daily_plan: state => state.daily_plan
  },
  actions: {
    async create_jumpstart({ commit }, payload) {
      await JumpStartService.jumpstart(payload.params);
    },
    update_selected_articles({ state }, payload) {
      if (!payload) {
        state.selected_articles.splice(0, state.selected_articles.length);
      } else {
        let i = state.selected_articles.indexOf(payload);
        if (i !== -1) {
          state.selected_articles[i] = payload;
        } else {
          state.selected_articles.push(payload);
        }
      }
    },
    update_preview_link({ state }, payload) {
      if (payload === '') {
        state.preview_link = payload;
        return false;
      }
      const base = `${BASE_API}/api/v0/volkswagen/jumpstart/${state.selected_plan.dateTime}/preview`;
      const url = new URL(base);
      state.selected_articles.forEach(article => {
        article.isActive === undefined || article.isActive ? url.searchParams.append('articleIds', article.id) : false;
      });
      state.preview_link = url.href;
    },
    async fetch_daily_plan({ commit }) {
      const data = await JumpStartService.dailyplan();
      commit('update_daily_plan', data);
    },
    clear_email_data({ commit, dispatch }) {
      commit('update_email_date', null);
      commit('update_schedule_time', null);
      commit('update_email_recipients', []);
      dispatch('update_preview_link', '');
      dispatch('update_selected_articles'); // Passing no payload just clears the selected_articles array
    },
    update_selected_active_articles({ state, dispatch }, payload) {
      if (!payload) {
        let article, i;
        for (i = 0; state.selected_plan.articles.length > i; i++) {
          article = state.selected_plan.articles[i];
          if (i < 5) {
            article.isActive = true;
          } else {
            article.isActive = false;
          }
          dispatch('update_selected_articles', article);
        }
      } else if (payload) {
        const numberOfActive = state.selected_articles.filter(item => {
          return item.isActive;
        }).length;
        if (numberOfActive >= 5 && payload.isActive) {
          payload.isActive = false;
          dispatch('update_selected_articles', payload);
        } else if (numberOfActive < 5) {
          payload.isActive = !payload.isActive;
          dispatch('update_selected_articles', payload);
        }
      }
    },
    debounced_preview: debounce(
      function({ dispatch }) {
        dispatch('update_preview_link');
      },
      1500,
      { maxWait: 1500 }
    )
  },
  mutations: {
    update_email_date(state, payload) {
      state.email_date = payload;
    },
    update_schedule_time(state, payload) {
      state.schedule_time = payload;
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
    update_default_schedule_time(state, payload) {
      state.default_schedule_time = payload;
    },
    update_selected_plan(state, payload) {
      state.selected_plan = payload;
    },
    update_daily_plan(state, payload) {
      state.daily_plan = payload;
    }
  }
};
