import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DatastoreStateInterface } from './state';
import { api } from 'boot/axios';

const actions: ActionTree<DatastoreStateInterface, StateInterface> = {
  async getTodos({ commit }) {
    return api.get('/tasks').then((response) => {
      commit('setTodos', response.data.result);
    });
  },

  async deleteTodo({ commit, state }, id) {
    return api.delete('/tasks/?id=' + id).then(() => {
      const newList = [];
      for (const i in state.todos) {
        if (id !== state.todos[i].id) {
          newList.push(state.todos[i]);
        }
      }
      commit('setTodos', newList);
    });
  },

  async completeTodo({ commit, state }, id) {
    return api.put('/tasks/?id=' + id).then(
      (response) => {
        console.log(response);
        const newList = [];
        const newComplete = [];
        for (const i in state.todos) {
          if (id !== state.todos[i].id) {
            newList.push(state.todos[i]);
          } else {
            newComplete.push(state.todos[i]);
          }
        }
        commit('setTodos', newList);
        commit('setCompletedTodos', newComplete);
      },
      (error) => {
        console.log(error);
      }
    );
  },

  async saveNewTodo({ commit, state }, payload) {
    return api.post('/tasks', payload).then((response) => {
      console.log('response.data');
      console.log(response.data);
      const newId: number = response.data;
      //push it to stack
      const newList = [];
      for (const i in state.todos) {
        newList.push(state.todos[i]);
      }
      newList.push({
        id: newId,
        content: payload.summery,
        description: payload.description,
        date: payload.date,
      });
      commit('setTodos', newList);
    });
  },

  async getCompletedTodos({ commit }) {
    return api.get('/tasks/complete').then((response) => {
      commit('setCompletedTodos', response.data.result);
    });
  },

  setEditVal({ commit, state }, id) {
    for (const i in state.todos) {
      if (state.todos[i].id === id) {
        commit('setEditTodo', state.todos[i]);
      }
    }
  },

  async saveEditedTodo({ commit }, payload) {
    return api.put('/tasks/', payload).then(() => {
      commit('updateEditedTodo', payload);
      //clear edit todo
      commit('setEditTodo', null);
    });
  },
};

export default actions;
