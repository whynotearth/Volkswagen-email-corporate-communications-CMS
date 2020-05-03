import { JumpStartService } from '@whynotearth/meredith-axios';
import { BASE_API } from '@/connection/api.js';

export default {
  namespaced: true,
  state: {
    loading: false,
    email_date: null,
    schedule_time: null,
    preview_link: '',
    postIds: []
  },
  mutations: {
    update_email_date(state, payload) {
      state.email_date = payload;
    },
    update_schedule_time(state, payload) {
      state.schedule_time = payload;
    },
    update_postIds(state, payload) {
      let i = state.postIds.indexOf(payload);
      i !== -1 ? state.postIds.splice(i, 1) : state.postIds.push(payload);
    },
    update_preview_link(state) {
      const base = `${BASE_API}/api/v0/volkswagen/jumpstart/preview`;
      const url = new URL(base);
      state.postIds.forEach(postId => {
        url.searchParams.append('postIds', postId);
      });
      state.preview_link = url.href;
    }
  },
  getters: {
    get_email_date: state => state.email_date,
    get_schedule_time: state => state.schedule_time,
    get_postIds: state => state.postIds,
    get_preview_link: state => state.preview_link
  }
};
