import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import  { UsersStateInterface } from './state';
//import { LocalStorage } from 'quasar';

const getters: GetterTree<UsersStateInterface, StateInterface> = {
  getUser(state){
    return state.user;
  },
  isAuthenticated(state){
    return state.isAuthenticated
  },
  getToken(state){
    return state.token
  }
};

export default getters;
