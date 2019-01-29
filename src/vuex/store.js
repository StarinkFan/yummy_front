import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
Vue.use(Vuex);

/**
 * 这里用到了localStorage 是很不推荐的, 以后再改
 * */

export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    remember: false
  },
  getters: {
    isRemember: state => {
      if(localStorage.password !== null && localStorage.password !== undefined) {
        return true;
      }
      return false;
    }
  },
  mutations: {
    setAuthorization(state, type) {
      state.Authorization = type;
      localStorage.setItem('Authorization', type);
    },

    [types.REMEMBER]: (state, data) => {
      state.remember = true;
      localStorage.email = data.email;
      localStorage.password = window.btoa(data.password)
    },
    [types.CANCELREMEMBER]: (state) => {
      state.remember = false;
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }

  }
})

