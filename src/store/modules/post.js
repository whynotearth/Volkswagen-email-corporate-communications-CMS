import { PostService } from '@whynotearth/meredith-axios';
import Vue from 'vue';
import { cloneDeep } from 'lodash-es';

const defaultPostFormData = {
  to: '',
  subject: '',
  description: '',
  date: '',
  recipients: []
};

export default {
  namespaced: true,
  state: {
    form_data: cloneDeep(defaultPostFormData),
    response_message: {
      type: '', // error, success
      message: '',
      class: '' // text-error text-success
    },
    posts: []
  },
  mutations: {
    update_response_message(state, payload) {
      Vue.set(state, 'response_message', payload);
    },
    // update_to(state, payload) {
    //   Vue.set(state.form_data, 'to', payload);
    // },
    // update_subject(state, payload) {
    //   Vue.set(state.form_data, 'subject', payload);
    // },
    // update_description(state, payload) {
    //   Vue.set(state.form_data, 'description', payload);
    // },
    // update_date(state, payload) {
    //   Vue.set(state.form_data, 'date', payload);
    // },
    // update_recipients(state, payload) {
    //   Vue.set(state.form_data, 'recipients', payload);
    // },
    update_form_data(state, payload) {
      Vue.set(state, 'form_data', payload);
    },
    update_posts(state, payload) {
      Vue.set(state, 'posts', payload);
    }
  },
  actions: {
    clear_form_data(context) {
      context.commit('update_form_data', cloneDeep(defaultPostFormData));
    },
    async add_post(context, payload) {
      await PostService.posts(payload.params);
    },
    async fetch_posts(context, payload) {
      // payload should be like {params: { date }}
      const data = await PostService.posts1(payload.params);
      context.commit('update_posts', data);
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
