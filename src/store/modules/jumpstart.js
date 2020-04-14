import { JumpStartService } from '@whynotearth/meredith-axios';
// import { companySlug } from '@/constants/app';

export default {
  namespaced: true,
  state: {
    form_data: {},
    response_message: {
      type: '', // error, success
      message: '',
      class: '' // text-error text-success
    }
  },
  mutations: {
    update_response_message(state, payload) {
      state.response_message = payload;
    },
    update_to(state, payload) {
      state.form_data.to = payload;
    },
    update_subject(state, payload) {
      state.form_data.subject = payload;
    },
    update_description(state, payload) {
      state.form_data.description = payload;
    },
    update_date(state, payload) {
      state.form_data.date = payload;
    }
  },
  actions: {
    async test(context, payload) {
      try {
        await JumpStartService.test(payload.params);
      } catch (error) {
        throw new Error('Error in jumstart test');
      }
    }
  },
  getters: {
    get_to: state => state.form_data.to,
    get_subject: state => state.form_data.subject,
    get_description: state => state.form_data.description,
    get_date: state => state.form_data.date,
    get_response_message: state => state.response_message
  }
};
