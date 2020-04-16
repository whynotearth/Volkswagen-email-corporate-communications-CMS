import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import authKeep from './modules/authKeep';
import category from './modules/category';
import loading from './modules/loading';
import snackbar from './modules/snackbar';
import post from './modules/post';
import memo from './modules/memo';
import overlay from './modules/overlay';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['memo', 'authKeep'],
  key: 'store'
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    snackbar,
    loading,
    auth,
    category,
    post,
    memo,
    authKeep,
    overlay
  }
});
