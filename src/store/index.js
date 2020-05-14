import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import authKeep from './modules/authKeep';
import profile from './modules/profile';
import category from './modules/category';
import loading from './modules/loading';
import snackbar from './modules/snackbar';
import article from './modules/article';
import memo from './modules/memo';
import email from './modules/email';
import overlay from './modules/overlay';
import distributionGroup from './modules/distributionGroup';
import recipient from './modules/recipient';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['memo', 'article', 'authKeep'],
  key: 'store'
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    snackbar,
    loading,
    auth,
    profile,
    category,
    article,
    memo,
    email,
    authKeep,
    distributionGroup,
    overlay,
    recipient
  }
});
