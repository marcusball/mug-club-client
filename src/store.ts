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
    auth_success(state: any, session: any) {
      state.status = 'success';
      state.verificationIdentity = null;
      state.token = session.id;
    },
    logout(state: any) {
      state.token = '';
    }
  } as any,
  actions: {
    login({ commit }, identity) {
      return new Promise((resolve, reject) => {
        const API_BASE = process.env.VUE_APP_API_URL;

        const form = new URLSearchParams();
        form.append('country_code', identity.countryCode);
        form.append('phone_number', identity.phoneNumber);

        fetch(`${API_BASE}/auth`, {
          method: 'POST',
          body: form,
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    loginVerify({ commit, state }, identity) {
      return new Promise((resolve, reject) => {
        commit('auth_verify_request');

        const API_BASE = process.env.VUE_APP_API_URL;

        const form = new URLSearchParams();
        form.append('country_code', identity.countryCode);
        form.append('phone_number', identity.phoneNumber);
        form.append('code', identity.verificationCode);

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
