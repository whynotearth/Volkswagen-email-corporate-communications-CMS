// This store module is part of auth module
// The separaton of auth and authKeep is because of vue-persist
// Contents of authKeep are stored in browser storage
// ----------------------------

import { cloneDeep } from 'lodash-es';

const defaultUser = {
  id: 0,
  isAuthenticated: false,
  userName: ''
};

export default {
  namespaced: true,
  state: {
    token: '',
    user: cloneDeep(defaultUser)
  },
  getters: {
    user: state => {
      return state.user;
    },
    isAuthenticated: state => {
      return state.user.isAuthenticated;
    },
    token: state => {
      return state.token;
    }
  },
  mutations: {
    updateToken(state, payload) {
      state.token = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    updateUser(context, payload) {
      context.commit('updateUser', payload);
    },
    updateToken(context, payload) {
      context.commit('updateToken', payload);
    },
    clear(context) {
      context.commit('updateToken', '');
      context.commit('updateUser', cloneDeep(defaultUser));
    }
  }
};
