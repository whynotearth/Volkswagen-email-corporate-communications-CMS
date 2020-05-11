export default {
  namespaced: true,
  state: {
    refCount: 0,
    isLoading: true,
    firstRouteEntered: false,
    isSplashScreenVisible: false
  },
  mutations: {
    loading(state, isLoading) {
      if (isLoading) {
        state.refCount++;
        state.isLoading = true;
      } else if (state.refCount > 0) {
        state.refCount--;
        state.isLoading = state.refCount > 0;
      }
    },
    updateFirstRouteEntered(state, payload) {
      state.firstRouteEntered = payload;
    },
    updateIsSplashScreenVisible(state, payload) {
      state.isSplashScreenVisible = payload;
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    firstRouteEntered(state) {
      return state.firstRouteEntered;
    },
    isSplashScreenVisible(state) {
      return state.isSplashScreenVisible;
    }
  }
};
