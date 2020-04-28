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
    memos: [],
    stats: {}
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
    update_memos(state, payload) {
      Vue.set(state, 'memos', payload);
    },
    update_stats(state, { key, data }) {
      Vue.set(state.stats, key, data);
    }
  },
  actions: {
    clear_form_data(context) {
      context.commit('update_form_data', cloneDeep(defaultMemoFormData));
    },
    async add_memo(context, payload) {
      await MemoService.memos(payload.params);
    },
    async fetch_memos(context, payload) {
      const data = await MemoService.memos1();
      context.commit('update_memos', data);
    },
    async fetch_stats(context, payload) {
      const data = await MemoService.stats(payload);
      context.commit('update_stats', { key: data.memoList.id, data });
    }
  },
  getters: {
    get_to: state => state.form_data.to,
    get_subject: state => state.form_data.subject,
    get_description: state => state.form_data.description,
    get_date: state => state.form_data.date,
    get_recipients: state => state.form_data.recipients,
    get_response_message: state => state.response_message,
    get_memos: state => state.memos,
    get_stats: state => state.stats
  }
};
