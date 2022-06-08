import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UsersStateInterface } from './state';
import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'


const actions: ActionTree<UsersStateInterface, StateInterface> = {
  

  async login({commit, dispatch}, form) {
    return api.post('/tokens', form)
      .then(response => {
        const user = response.data.result
        commit('setUser', user);
        commit('setToken', user.token)
        api.defaults.headers.common.Authorization = user.token
        dispatch('getUser', user.token)         
      })
  },
  

  async logOut({ commit }){
    api.defaults.headers.common.Authorization = ''
    commit('removeToken')
  },
  
  async getUser({ commit }) {
    await api.get('/user/info').then(response => {
      commit('setUser', response.data.result)
      Promise.resolve(response.data.result);
    }).catch(error=>{
      Promise.reject(error);
    })
  },
  
  async init({ commit, dispatch }){
    if(!LocalStorage.has('token')){
      return;
    }
    
    const token:string = JSON.parse(LocalStorage.getItem('token')||'')
    if (token) {    
      commit('setToken', token)
      api.defaults.headers.common.Authorization = token
      await dispatch('getUser')
    } else {
      commit('removeToken')
    }
  }
  
};

export default actions;
