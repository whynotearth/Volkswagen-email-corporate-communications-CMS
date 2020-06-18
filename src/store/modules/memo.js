import { MemoService } from '@whynotearth/meredith-axios';
import Vue from 'vue';
import { cloneDeep } from 'lodash-es';
import { downloadBase64AsFile } from '@/helpers';

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
    stats_overview: null,
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
    async fetch_stats_overview({ commit }, payload) {
      const data = await MemoService.overallstats(payload.params);
      commit('update_stats_overview', data);
    },
    async export_stats_overview({ commit }, { params, filenameDate }) {
      const data = await MemoService.export(params);
      downloadBase64AsFile({ content: data, fileName: `memos-stats-${filenameDate}.csv`, mimeType: 'text/csv' });
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
