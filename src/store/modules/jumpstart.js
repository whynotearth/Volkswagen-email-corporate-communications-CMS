import { JumpStartService } from '@whynotearth/meredith-axios';
import Vue from 'vue';
// import { companySlug } from '@/constants/app';

export default {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    updateAll(state, payload) {
      Vue.set(state, 'items', payload);
    }
  },
  actions: {
    async test(context, { params }) {
      
      try {
        const data = await JumpStartService.test(params);
        context.commit('update', data);
      } catch (error) {
        throw new Error('Error in jumstart test');
      }
    }
  },
  getters: {
    items: state => name => {
      return state.items || [];
    }
  }
};
