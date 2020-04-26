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
    async importEmailList(context, { ajax, body }) {
      // FIXME: there is a bug in swagger-axios-codegen https://github.com/Manweill/swagger-axios-codegen/issues/93
      // return await DistributionGroupService.distributiongroups1(
      //   { params: payload },
      //   { headers: { 'content-type': 'multipart/form-data' } }
      // );

      return new Promise((resolve, reject) => {
        var bodyFormData = new FormData();
        bodyFormData.append('file', body.file);

        let url = '/api/v0/volkswagen/distributiongroups';
        const configs = {
          method: 'put',
          url,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: bodyFormData
        };
        ajax(configs, resolve, reject);
      });
    },
    async getEmailLists(context) {
      try {
        const data = await DistributionGroupService.stats();
        context.commit('updateEmailLists', { data });
      } catch (error) {
        return new Error('get stats issue');
      }
    },
    getEmails(context, groupName) {
      return new Promise((resolve, reject) => {
        DistributionGroupService.recipients({
          distributionGroupName: context.state.selectedEmailList.distributionGroup || groupName
        })
        .then(data => {
          context.commit('updateEmails', { data });
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
      })
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
          body: { email: context.state.selectedEmail.email }
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
