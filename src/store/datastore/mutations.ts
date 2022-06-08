import { MutationTree } from 'vuex';
import { DatastoreStateInterface } from './state';

const mutation: MutationTree<DatastoreStateInterface> = {
  setTodos (state, payload) {
    if(typeof payload == 'string'){
      state.todos = (JSON.parse(payload)||{});
    }else{
       state.todos = payload;
    }
  },

  setCompletedTodos (state, payload) {
    if(typeof payload === 'string'){
      //from server
      state.completedTodos = (JSON.parse(payload)||{});
    }else{
      //locally
       for(const i in state.completedTodos){
          payload.push(state.completedTodos[i]);
       }
       state.completedTodos = payload;
    }
  },

  setEditTodo(state, payload) {
    if(payload === null)
      payload = {id:0, content:'', date:''}
    state.editTodo = payload;
  },

  updateEditedTodo(state, payload){
    for(const i in state.todos){
        if(state.todos[i].id == payload.id){
          state.todos[i].content = payload.summery;
          state.todos[i].date = payload.duedate;
        }
    }
  }
};

export default mutation;
