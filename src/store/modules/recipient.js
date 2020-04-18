import { RecipientService } from '@whynotearth/meredith-axios';
import Vue from 'vue';

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
    async getItems(context, { body }) {
      // TODO:
      // const data = await RecipientService.recipient();
    }
  },
  getters: {
    items: state => name => {
      return state.items || [];
    }
  }
};
