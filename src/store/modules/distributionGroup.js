import { DistributionGroupService } from '@whynotearth/meredith-axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    stats: [],
    selectedStat: {},
    recipients: [],
    email: ''
  },
  mutations: {
    updateStats(state, payload) {
      state.stats = payload.data;
    },
    selectStat(state, payload) {
      state.selectedStat = payload;
    },
    updateRecipients(state, payload) {
      state.recipients = payload.data;
    },
    updateEmail(state, payload) {
      state.email = payload;
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
        context.commit('updateRecipients', { data });
      } catch (error) {
        return new Error('get recipients issue');
      }
    },
    async addRecipient(context, groupName, options) {
      try {
        const data = await DistributionGroupService.recipients1({ distributionGroupName: groupName }, options);
      } catch (error) {
        return new Error('add recipient issue');
      }
    },
    async updateRecipient(content, group, options) {
      try {
        const data = await DistributionGroupService.recipients2(
          { distributionGroupName: group.name, recipientId: group.id },
          options
        );
      } catch (error) {
        return new Error('put recipient issue');
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
      return state.recipients;
    },
    email: state => {
      return state.email;
    }
  }
};
