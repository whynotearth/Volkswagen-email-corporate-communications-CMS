export default {
  namespaced: true,
  state: {
    token: ''
  },
  getters: {
    token: state => {
      return state.token;
    }
  },
  mutations: {
    updateToken(state, payload) {
      state.token = payload;
    }
  },
  actions: {
    updateToken(context, payload) {
      context.commit('updateToken', payload);
    },
    clear(context) {
      context.commit('updateToken', '');
    }
  }
};
