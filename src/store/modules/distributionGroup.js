// TODO: refactor function and state names to be snake_case
// refactor: remove new Promise() and just return ajax

import { DistributionGroupService } from '@whynotearth/meredith-axios';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    emailLists: [],
    selectedEmailList: {},
    emails: [],
    selectedEmail: {},
    email: '',
    user_form_data: {
      first_name: '',
      last_name: '',
      email: '',
      segments: ''
    },
    stats_overview: null,
    stats_overview_date_range: {
      text: '',
      value: [] // ['2020-06-06', '2020-06-13']
    }
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
    },
    updateFormFirstName(state, payload) {
      Vue.set(state.user_form_data, 'first_name', payload);
    },
    updateFormLastName(state, payload) {
      Vue.set(state.user_form_data, 'last_name', payload);
    },
    updateFormEmail(state, payload) {
      Vue.set(state.user_form_data, 'email', payload);
    },
    updateFormSegments(state, payload) {
      Vue.set(state.user_form_data, 'segments', payload);
    },
    update_stats_overview(state, payload) {
      state.stats_overview = payload;
    },
    update_stats_overview_date_range(state, payload) {
      state.stats_overview_date_range = payload;
    }
  },
  actions: {
    async importEmailList(context, { ajax, body }) {
      // FIXME: there is a bug in swagger-axios-codegen https://github.com/Manweill/swagger-axios-codegen/issues/93
      // return await DistributionGroupService.distributiongroups1(
      //   { params: payload },
      //   { headers: { 'content-type': 'multipart/form-data' } }
      // );

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
      return ajax(configs);
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
          // TODO: we should get groupName only from one source, param is better.
          distributionGroupName: context.state.selectedEmailList.distributionGroup || groupName
        })
          .then(data => {
            context.commit('updateEmails', { data });
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    addEmail(context) {
      return new Promise((resolve, reject) => {
        DistributionGroupService.recipients1({
          // TODO: get groupName from param
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
          // TODO: get groupName from param
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
          // TODO: get groupName from param
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
    },
    async exportList(context) {
      return new Promise((resolve, reject) => {
        DistributionGroupService.export({
          distributionGroupName: context.state.selectedEmailList.distributionGroup
        })
          .then(data => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async fetch_stats_overview({ commit }, payload) {
      // TODO:
      // const data = await MemoService.overallstats(payload.params);
      const data = {
        userCount: 5,
        userGrowthPercent: 100,
        openCount: 657,
        openGrowthPercent: 100,
        clickCount: 0,
        clickGrowthPercent: 100,
        users: [
          { date: '2020-06-13T00:00:00', count: 0 },
          { date: '2020-06-14T00:00:00', count: 0 },
          { date: '2020-06-15T00:00:00', count: 5 },
          { date: '2020-06-16T00:00:00', count: 5 }
        ],
        opens: [
          { date: '2020-06-13T00:00:00', count: 0 },
          { date: '2020-06-14T00:00:00', count: 1 },
          { date: '2020-06-15T00:00:00', count: 6 },
          { date: '2020-06-16T00:00:00', count: 657 }
        ],
        clicks: [
          { date: '2020-06-13T00:00:00', count: 0 },
          { date: '2020-06-14T00:00:00', count: 0 },
          { date: '2020-06-15T00:00:00', count: 0 },
          { date: '2020-06-16T00:00:00', count: 0 }
        ]
      };
      commit('update_stats_overview', data);
    },
    delete_group(context, payload) {
      console.log('TODO: connect delete group to api', payload);
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
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
    },
    get_form_first_name: state => state.user_form_data.first_name,
    get_form_last_name: state => state.user_form_data.last_name,
    get_form_email: state => state.user_form_data.email,
    get_form_segments: state => state.user_form_data.segments,
    get_stats_overview: state => state.stats_overview,
    get_stats_overview_date_range: state => state.stats_overview_date_range
  }
};
