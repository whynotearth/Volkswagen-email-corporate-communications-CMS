import { DistributionGroupService } from '@whynotearth/meredith-axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    stats: [],
    selectedStat: {},
    recipients: []
  },
  mutations: {
    updateStats(state, payload) {
      state.stats = payload.data;
    },
    selectStat(state, payload) {
      state.selectedStat = payload;
    },
    updateRecipients(state, payload) {
      state.recipients = payload.data
    }
  },
  actions: {
    async getStats(context) {
      try {
        const data = await DistributionGroupService.stats();
        context.commit('updateStats', { data });
      } catch (error) {
        return new Error('get stats issue');
      }
    },
    async getRecipients(context, groupName) {
      try {
        const data = await DistributionGroupService.recipients({ distributionGroupName: groupName });
        context.commit('updateRecipients', { data })
      } catch (error) {
        return new Error('get recipients issue');
      }
    }
  },
  getters: {
    getStats: state => {
      return state.stats || [];
    },
    selectedStat: state => {
      return state.selectedStat;
    },
    getRecipients: state => {
      return state.recipients
    }
  }
};
