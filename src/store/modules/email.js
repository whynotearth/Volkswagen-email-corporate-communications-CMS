import { PostService, PostCategoryService } from '@whynotearth/meredith-axios';

export default {
  namespaced: true,
  state: {
    email_date: '',
    postIds: []
  },
  mutations: {
    update_email_date(state, payload) {
      state.email_date = payload;
    },
    update_postIds(state, payload) {
      let i = state.postIds.indexOf(payload);
      i !== -1 ? state.postIds.splice(i, 1) : state.postIds.push(payload);
    }
  },
  actions: {},
  getters: {
    get_email_date: state => state.email_date,
    get_postIds: state => state.postIds
  }
};
