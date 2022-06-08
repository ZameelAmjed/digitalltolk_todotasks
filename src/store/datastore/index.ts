import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { DatastoreStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const datastoreModule: Module<DatastoreStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default datastoreModule;
