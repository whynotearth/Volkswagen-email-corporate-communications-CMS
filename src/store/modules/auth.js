import { AuthenticationService } from '@whynotearth/meredith-axios';
import { APIPath, setDocumentClassesOnToggleDialog } from '@/helpers';
import { ajax } from '@/connection/ajax.js';
import store from '@/store';

const authStates = {
  'auth-login': { title: 'Log In' },
  'auth-forgot-password': { title: 'Reset Password' },
  'auth-signup': { title: 'Sign Up' },
  'auth-login-existing-account': { title: '' }
};

const defaultState = {
  email: '',
  recoveryEmail: '',
  token: '',
  newPassword: '',
  confirmPassword: '',
  password: '',
  status: '',
  loading: false,
  loginError: '',
  registerError: '',
  forgotPasswordError: '',
  provider: '',
  returnURL: '',
  activeState: 'auth-login',
  dialog: {
    title: 'Log In',
    isOpen: false
  }
};

export default {
  namespaced: true,
  state: defaultState,
  getters: {
    dialog: state => {
      return state.dialog;
    },
    activeState: state => {
      return state.activeState;
    },
    email: state => {
      return state.email;
    },
    recoveryEmail: state => {
      return state.recoveryEmail;
    },
    token: state => {
      return state.token;
    },
    password: state => {
      return state.password;
    },
    newPassword: state => {
      return state.newPassword;
    },
    confirmPassword: state => {
      return state.confirmPassword;
    },
    loading: state => {
      return state.loading;
    },
    loginError: state => {
      return state.loginError;
    },
    registerError: state => {
      return state.registerError;
    },
    forgotPasswordError: state => {
      return state.forgotPasswordError;
    },
    oauth(state) {
      return APIPath(`/api/v0/authentication/provider/login?provider=${state.provider}&returnUrl=${state.returnURL}`);
    }
  },
  mutations: {
    updateDialog(state, payload) {
      state.dialog = payload;
    },
    updateLoginError(state, payload) {
      state.loginError = payload;
    },
    updateRegisterError(state, payload) {
      state.registerError = payload;
    },
    updateForgotPasswordError(state, payload) {
      state.forgotPasswordError = payload;
    },
    updateEmail(state, payload) {
      state.email = payload;
    },
    updateRecoveryEmail(state, payload) {
      state.recoveryEmail = payload;
    },
    updateToken(state, payload) {
      state.token = payload;
    },
    updateNewPassword(state, payload) {
      state.newPassword = payload;
    },
    updateConfirmPassword(state, payload) {
      state.confirmPassword = payload;
    },
    updatePassword(state, payload) {
      state.password = payload;
    },
    updateProvider(state, payload) {
      state.provider = payload;
    },
    updateLoading(state, payload) {
      state.loading = payload;
    },
    updateReturnUrl(state, payload) {
      state.returnURL = payload;
    },
    updateActiveState(state, payload) {
      state.activeState = payload;
    },
    logout(state) {
      for (const key in defaultState) {
        if (Object.prototype.hasOwnProperty.call(defaultState, key)) {
          state[key] = defaultState[key];
        }
      }
      // NOTE: auth/logout also triggers authKeep/clear from store-moderator
    }
  },
  actions: {
    updateLoginError(context, payload) {
      context.commit('updateLoginError', payload);
    },
    updateReturnUrl(context, payload) {
      context.commit('updateReturnUrl', payload);
    },
    updateDialog(context, payload) {
      const dialog = {
        ...context.state.dialog,
        ...payload
      };

      setDocumentClassesOnToggleDialog(dialog.isOpen);
      context.commit('updateDialog', dialog);
    },
    updateActiveState(context, payload) {
      context.commit('updateActiveState', payload);
      context.commit('updateLoginError', '');
      context.commit('updateRegisterError', '');
      context.commit('updateForgotPasswordError', '');
      context.commit('updateDialog', {
        ...context.state.dialog,
        title: authStates[payload].title
      });
    },
    loginStandard(context) {
      context.commit('updateLoginError', '');
      context.commit('updateLoading', true);
      return AuthenticationService.login({
        body: {
          email: context.state.email,
          password: context.state.password
        }
      })
        .then(async token => {
          await store.dispatch('authKeep/updateToken', token);
          await store.dispatch('auth/ping').catch(error => {
            context.commit('updateLoginError', error.response.data.error);
          });
          context.commit('updateLoading', false);
        })
        .catch(error => {
          context.commit('updateLoginError', error.response.data.error);
          context.commit('updateLoading', false);
        });
    },
    async registerAuto(context, { email }) {
      try {
        const token = await AuthenticationService.register({
          body: {
            email: email
          }
        });
        store.dispatch('authKeep/updateToken', token);
      } catch (error) {
        throw error;
      }
    },
    register(context) {
      context.commit('updateLoading', true);
      context.commit('updateRegisterError', '');
      return new Promise((resolve, reject) => {
        AuthenticationService.register({
          body: {
            email: context.state.email,
            password: context.state.password
          }
        })
          .then(token => {
            store
              .dispatch('auth/ping')
              .then(resolve)
              .catch(error => {
                console.log('Could not get user data after successful login');
                reject(error);
              })
              .finally(() => {
                context.commit('updateLoading', false);
              });
          })
          .catch(error => {
            reject(error);
            context.commit('updateLoading', false);

            const response = error.response && error.response.data;
            if (response) {
              context.commit('updateRegisterError', response[0].description);
            } else {
              context.commit('updateRegisterError', 'Registration failed');
            }
            reject(error);
            context.commit('updateLoading', false);
          });
      });
    },
    sendResetPasswordLink(context) {
      const host = window.location.origin;
      context.commit('updateLoading', true);
      AuthenticationService.forgotpassword({
        body: {
          companySlug: process.env.VUE_APP_COMPANY_SLUG,
          email: context.state.recoveryEmail,
          returnUrl: `${host}/new-password`
        }
      })
        .then(response => response)
        .catch(error => {
          context.commit('updateLoginError', error.response.data.error);
          context.commit('updateLoading', false);
        });
    },
    setNewPassword(context) {
      const host = window.location.origin;
      context.commit('updateLoading', true);
      AuthenticationService.forgotpasswordreset({
        body: {
          email: context.state.recoveryEmail,
          token: context.state.token,
          password: context.state.newPassword,
          confirmPassword: context.state.confirmPassword,
          companySlug: process.env.VUE_APP_COMPANY_SLUG,
          returnUrl: `${host}/login`
        }
      })
        .then(response => response)
        .catch(error => {
          context.commit('updateLoginError', error.response.data.error);
          context.commit('updateLoading', false);
        });
    },
    logout(context) {
      context.commit('updateLoading', true);

      return AuthenticationService.logout().then(async () => {
        context.commit('updateLoading', false);
        context.commit('logout');
      });
    },
    async ping(context) {
      try {
        const params = {};
        const options = {};
        const user = await AuthenticationService.ping(params, options);
        await store.dispatch('authKeep/updateUser', user);
      } catch (error) {
        const isStatus401 = error.response.status;
        if (isStatus401) {
          console.log('ping 401');
          await store.dispatch('authKeep/clear');
          return 'IS_LOGGED_OUT';
        } else {
          console.log('ping response is unknown.');
          return false;
        }
      }
      return true;
    }
  }
};
