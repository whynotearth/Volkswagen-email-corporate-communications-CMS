import { JumpStartService } from '@whynotearth/meredith-axios';

export default {
  namespaced: true,
  state: {
    loading: false,
    email_date: '',
    preview_img: null,
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
  getters: {
    get_email_date: state => state.email_date,
    get_postIds: state => state.postIds,
    get_preview: state => state.preview_img
  }
};
