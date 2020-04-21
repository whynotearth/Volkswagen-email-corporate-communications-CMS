import { DistributionGroupService } from '@whynotearth/meredith-axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    stats: []
  },
  mutations: {
    update(state, payload) {
      state.stats = payload.data;
    }
  },
  actions: {
    async getStats(context) {
      try {
        const data = await DistributionGroupService.stats();
        context.commit('update', { data });
      } catch (error) {
        return new Error('get stats issue');
      }
    }
  },
  getters: {
    getStats: state => {
      return state.stats || {};
    }
  }
};
