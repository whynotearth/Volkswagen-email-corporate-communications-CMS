import { RecipientService, DistributionGroupService } from '@whynotearth/meredith-axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    update_items(state, payload) {
      Vue.set(state, 'items', payload);
    }
  },
  actions: {
    async fetch_recipients(context) {
      const data = await DistributionGroupService.distributiongroups1();
      context.commit('update_items', data);
    }
  },
  getters: {
    get_recipients_available: state => {
      return state.items || [];
    }
  }
};
