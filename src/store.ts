import Vue from 'vue';
import Vuex from 'vuex';

import { MutationTree } from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    person: {},
    verificationIdentity: { countryCode: '', phoneNumber: '' }
  },
  mutations: {
    auth_request(state: any) {
      state.status = 'loading';
    },
    auth_verify(state: any, { countryCode, phoneNumber }: { countryCode: string, phoneNumber: string }) {
      state.status = 'verify';

      state.verificationIdentity.countryCode = countryCode;
      state.verificationIdentity.phoneNumber = phoneNumber;
    },
    auth_verify_request(state: any) {
      state.status = 'loading';
    },
    auth_success(state: any, session: any) {
      state.status = 'success';
      state.verificationIdentity = null;
      state.token = session.id;
    }
  } as any,
  actions: {
    login({ commit }, identity) {
      return new Promise((resolve, reject) => {
        commit('auth_request');

        const API_BASE = process.env.VUE_APP_API_URL;

        const form = new URLSearchParams();
        form.append('country_code', '1');
        form.append('phone_number', identity.phone_number);

        fetch(`${API_BASE}/auth`, {
          method: 'POST',
          body: form
        })
          .then(resp => {
            commit('auth_verify', { countryCode: '1', phoneNumber: identity.phone_number });
            resolve(resp);
          })
          .catch(err => {
            commit('auth_error');
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    login_verify({ commit, state }, verificationCode) {
      return new Promise((resolve, reject) => {
        commit('auth_verify_request');

        const API_BASE = process.env.VUE_APP_API_URL;

        const form = new URLSearchParams();
        form.append('country_code', state.verificationIdentity.countryCode);
        form.append('phone_number', state.verificationIdentity.phoneNumber);
        form.append('code', verificationCode);

        fetch(`${API_BASE}/auth/verify`, {
          method: 'POST',
          body: form
        })
          .then(resp => resp.json())
          .then(session => {
            console.log(session);
            localStorage.setItem('token', session.id);
            commit('auth_success', session);
            resolve(session);
          })
          .catch(err => {
            commit('auth_error');
            localStorage.removeItem('token');
            reject(err);
          });
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout');
        localStorage.removeItem('token');
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,

    verificationIdentity: (state) => state.verificationIdentity,
  }
});
