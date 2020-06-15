import { MemoService } from '@whynotearth/meredith-axios';
import Vue from 'vue';
import { cloneDeep } from 'lodash-es';

const defaultMemoFormData = {
  to: '',
  subject: '',
  description: '',
  date: '',
  recipients: []
};

export default {
  namespaced: true,
  state: {
    // TODO: use form_data: cloneDeep(defaultMemoFormData),
    form_data: {
      to: '',
      subject: '',
      description: '',
      date: '',
      recipients: []
    },
    response_message: {
      type: '', // error, success
      message: '',
      class: '' // text-error text-success
    },
    stats: [],
    stats_overview: {},
    stats_overview_date_range: {
      text: '',
      value: [] // ['2020-06-06', '2020-06-13']
    },
    stat: {}
  },
  mutations: {
    update_response_message(state, payload) {
      Vue.set(state, 'response_message', payload);
    },
    update_to(state, payload) {
      Vue.set(state.form_data, 'to', payload);
    },
    update_subject(state, payload) {
      Vue.set(state.form_data, 'subject', payload);
    },
    update_description(state, payload) {
      Vue.set(state.form_data, 'description', payload);
    },
    update_date(state, payload) {
      Vue.set(state.form_data, 'date', payload);
    },
    update_recipients(state, payload) {
      Vue.set(state.form_data, 'recipients', payload);
    },
    update_form_data(state, payload) {
      Vue.set(state, 'form_data', payload);
    },
    update_stats(state, payload) {
      Vue.set(state, 'stats', payload);
    },
    update_stat(state, { key, data }) {
      Vue.set(state.stat, key, data);
    },
    update_stats_overview(state, payload) {
      state.stats_overview = payload;
    },
    update_stats_overview_date_range(state, payload) {
      state.stats_overview_date_range = payload;
    }
  },
  actions: {
    clear_form_data(context) {
      context.commit('update_form_data', cloneDeep(defaultMemoFormData));
    },
    async add_memo(context, payload) {
      await MemoService.memos(payload.params);
    },
    async fetch_stats(context, payload) {
      const data = await MemoService.stats();
      context.commit('update_stats', data);
    },
    async fetch_stat(context, payload) {
      const data = await MemoService.stats1(payload);
      context.commit('update_stat', { key: data.memoStat.id, data });
    },
    fetch_stats_overview({ commit }) {
      // const data = await JumpStartService.stats2????????();
      const data = {
        userCount: 500,
        userGrowthPercent: 12,
        openCount: 400,
        openGrowthPercent: 20,
        clickCount: 50,
        clickGrowthPercent: 15,
        users: [
          {
            date: '2020-06-11',
            count: 100
          },
          {
            date: '2020-06-12',
            count: 50
          },
          {
            date: '2020-06-13',
            count: 20
          },
          {
            date: '2020-06-14',
            count: 80
          },
          {
            date: '2020-06-15',
            count: 120
          },
          {
            date: '2020-06-16',
            count: 150
          },
          {
            date: '2020-06-17',
            count: 200
          },
          {
            date: '2020-06-18',
            count: 100
          },
          {
            date: '2020-06-19',
            count: 50
          },
          {
            date: '2020-06-20',
            count: 20
          },
          {
            date: '2020-06-21',
            count: 81
          },
          {
            date: '2020-06-22',
            count: 120
          },
          {
            date: '2020-06-23',
            count: 150
          },
          {
            date: '2020-06-24',
            count: 200
          },
          {
            date: '2020-06-25',
            count: 100
          },
          {
            date: '2020-06-26',
            count: 50
          },
          {
            date: '2020-06-27',
            count: 20
          },
          {
            date: '2020-06-28',
            count: 80
          },
          {
            date: '2020-06-29',
            count: 120
          },
          {
            date: '2020-06-30',
            count: 150
          },
          {
            date: '2020-07-01',
            count: 201
          }
        ],
        opens: [
          {
            date: '2020-06-11',
            count: 30
          }
        ],
        clicks: [
          {
            date: '2020-06-11',
            count: 50
          }
        ],
        tags: [
          {
            tag: 'People',
            stats: [
              {
                date: '2020-06-12',
                count: 2
              },
              {
                date: '2020-06-13',
                count: 3
              }
            ]
          },
          {
            tag: 'Priority',
            stats: [
              {
                date: '2020-06-12',
                count: 2
              },
              {
                date: '2020-06-13',
                count: 4
              }
            ]
          },
          {
            tag: 'Community',
            stats: [
              {
                date: '2020-06-12',
                count: 1
              },
              {
                date: '2020-06-13',
                count: 5
              }
            ]
          }
        ]
      };
      commit('update_stats_overview', data);
    }
  },
  getters: {
    get_to: state => state.form_data.to,
    get_subject: state => state.form_data.subject,
    get_description: state => state.form_data.description,
    get_date: state => state.form_data.date,
    get_recipients: state => state.form_data.recipients,
    get_response_message: state => state.response_message,
    get_stats: state => state.stats,
    get_stat: state => state.stat,
    get_stats_overview: state => state.stats_overview,
    get_stats_overview_date_range: state => state.stats_overview_date_range
  }
};
