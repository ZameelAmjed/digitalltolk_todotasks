import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { DatastoreStateInterface } from './state';

const getters: GetterTree<DatastoreStateInterface, StateInterface> = {
  todos (state) {
    return state.todos
  },
  completedTodos (state) {
    return state.completedTodos
  },
  editTodo(state){
    return state.editTodo;
  }
};

export default getters;
