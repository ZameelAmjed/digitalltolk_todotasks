import { MutationTree } from 'vuex';
import { UsersStateInterface } from './state';
import { LocalStorage } from 'quasar';

const mutation: MutationTree<UsersStateInterface> = {
  setUser(state, user) {
    state.user = user;
  },

  async setToken(state, token) {
    state.token = token;
    state.isAuthenticated = true;
    LocalStorage.set('token', JSON.stringify(token));
  },

  removeToken(state) {
    state.token = '';
    state.isAuthenticated = false;
    LocalStorage.remove('token');
  },
};

export default mutation;
