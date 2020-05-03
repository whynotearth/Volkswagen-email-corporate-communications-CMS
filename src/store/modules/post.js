import { PostService, PostCategoryService } from '@whynotearth/meredith-axios';
import Vue from 'vue';
import { cloneDeep } from 'lodash-es';

const defaultPostFormData = {
  headline: '',
  description: '',
  date: '',
  price: undefined,
  eventDate: '',
  // this is filelist
  images: [],
  selected_category: {}
};

export default {
  namespaced: true,
  state: {
    form_data: cloneDeep(defaultPostFormData),
    categories: [],
    response_message: {
      type: '', // error, success
      message: '',
      class: '' // text-error text-success
    },
    posts: []
  },
  mutations: {
    update_categories(state, payload) {
      state.categories = payload;
    },
    update_headline(state, payload) {
      Vue.set(state.form_data, 'headline', payload);
    },
    update_description(state, payload) {
      Vue.set(state.form_data, 'description', payload);
    },
    update_date(state, payload) {
      Vue.set(state.form_data, 'date', payload);
    },
    update_price(state, payload) {
      Vue.set(state.form_data, 'price', payload);
    },
    update_eventDate(state, payload) {
      Vue.set(state.form_data, 'eventDate', payload);
    },
    update_images(state, payload) {
      Vue.set(state.form_data, 'images', payload);
    },
    update_selected_category(state, payload) {
      Vue.set(state.form_data, 'selected_category', payload);
    },
    update_response_message(state, payload) {
      Vue.set(state, 'response_message', payload);
    },
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
    async fetch_categories(context) {
      const data = await PostCategoryService.categories();
      context.commit('update_categories', data);
    },
    async fetch_posts(context, payload) {
      // payload should be like {params: { date }}
      const data = await PostService.posts1(payload.params);
      context.commit('update_posts', data);
    }
  },
  getters: {
    get_date: state => state.form_data.date,
    get_headline: state => state.form_data.headline,
    get_description: state => state.form_data.description,
    get_price: state => state.form_data.price,
    get_eventDate: state => state.form_data.eventDate,
    get_images: state => state.form_data.images,
    get_selected_category: state => state.form_data.selected_category,
    get_response_message: state => state.response_message,
    get_posts: state => state.posts,
    get_categories: state => state.categories
  }
};
