import { PostService } from '@whynotearth/meredith-axios';
import Vue from 'vue';
// import { companySlug } from '@/constants/app';

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    updateAll(state, payload) {
      Vue.set(state, 'items', payload);
    }
  },
  actions: {
    async addItem(context, { body }) {
      try {
        const data = await PostService.posts({ body });
        // context.commit('update', data);
      } catch (error) {
        return new Error('Error in add post');
      }
    },
    async getItems(context, { date }) {
      try {
        const data = await PostService.posts1({ date });
        context.commit('update', data);
      } catch (error) {
        return new Error('Error in get posts');
      }
    }
  },
  getters: {
    items: state => name => {
      return state.items || [];
    }
  }
};
