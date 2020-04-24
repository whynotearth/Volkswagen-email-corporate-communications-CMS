import { DistributionGroupService } from '@whynotearth/meredith-axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    emailLists: [],
    selectedEmailList: {},
    emails: [],
    selectedEmail: {},
    email: ''
  },
  mutations: {
    updateEmailLists(state, payload) {
      state.emailLists = payload.data;
    },
    selectEmailList(state, payload) {
      state.selectedEmailList = payload;
    },
    updateEmails(state, payload) {
      state.emails = payload.data;
    },
    selectEmail(state, payload) {
      state.selectedEmail = payload;
    },
    updateEmail(state, payload) {
      state.email = payload;
    }
  },
  actions: {
    async getEmailLists(context) {
      try {
        const data = await DistributionGroupService.stats();
        context.commit('updateEmailLists', { data });
      } catch (error) {
        return new Error('get stats issue');
      }
    },
    async getEmails(context, groupName) {
      try {
        const data = await DistributionGroupService.recipients({
          distributionGroupName: context.state.selectedEmailList.distributionGroup || groupName
        });
        context.commit('updateEmails', { data });
      } catch (error) {
        return new Error('get recipients issue');
      }
    },
    addEmail(context) {
      return new Promise((resolve, reject) => {
        DistributionGroupService.recipients1({
          distributionGroupName: context.state.selectedEmailList.distributionGroup,
          body: { email: context.state.email }
        })
          .then(data => {
            context.commit('updateEmail', '');
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
          distributionGroupName: context.state.selectedEmailList.distributionGroup,
          recipientId: context.state.selectedEmail.id,
          body: { email: context.state.email }
        })
          .then(data => {
            context.commit('updateEmail', '');
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
          distributionGroupName: context.state.selectedEmailList.distributionGroup,
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
    getEmailLists: state => {
      return state.emailLists || [];
    },
    selectedEmailList: state => {
      return state.selectedEmailList;
    },
    getEmails: state => {
      return state.emails;
    },
    selectedEmail: state => {
      return state.selectedEmail;
    },
    email: state => {
      return state.email;
    }
  }
};
