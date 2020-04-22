import { DistributionGroupService } from '@whynotearth/meredith-axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    stats: [],
    selectedStat: {},
    recipients: [],
    selectedEmail: {},
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
    selectEmail(state, payload) {
      state.selectedEmail = payload;
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
    async getRecipients(context) {
      try {
        const data = await DistributionGroupService.recipients({
          distributionGroupName: context.state.selectedStat.distributionGroup
        });
        context.commit('updateRecipients', { data });
      } catch (error) {
        return new Error('get recipients issue');
      }
    },
    addEmail(context) {
      return new Promise((resolve, reject) => {
        DistributionGroupService.recipients1({
          distributionGroupName: context.state.selectedStat.distributionGroup,
          body: { email: context.state.email }
        })
          .then(data => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    editEmail(context) {
      return new Promise((resolve, reject) => {
        DistributionGroupService.recipients2({
          distributionGroupName: context.state.selectedStat.distributionGroup,
          recipientId: context.state.selectedEmail.id,
          body: { email: context.state.email }
        })
          .then(data => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    deleteEmail(context) {
      return new Promise((resolve, reject) => {
        DistributionGroupService.recipients3({
          distributionGroupName: context.state.selectedStat.distributionGroup,
          recipientId: context.state.selectedEmail.id
        })
          .then(data => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
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
    selectedEmail: state => {
      return state.selectedEmail;
    },
    email: state => {
      return state.email;
    }
  }
};
