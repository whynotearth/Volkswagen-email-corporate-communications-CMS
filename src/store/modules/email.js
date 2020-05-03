import { PostService, PostCategoryService } from '@whynotearth/meredith-axios';

export default {
  namespaced: true,
  state: {
    email_date: '',
    postIds: new Set()
  },
  mutations: {
    update_email_date(state, payload) {
      state.email_date = payload;
    },
    update_postIds(state, payload) {
      state.postIds.add(payload);
    }
  },
  actions: {},
  getters: {
    get_email_date: state => state.email_date,
    get_postIds: state => state.postIds
  }
};
