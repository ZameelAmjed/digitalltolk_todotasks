import { Todo } from 'src/components/models';

export interface DatastoreStateInterface {
  prop: boolean;
  todos: Record<number, Todo>;
  completedTodos: Record<number, Todo>;
  editTodo: Todo;
}

function state(): DatastoreStateInterface {
  return {
    prop: false,
    todos: [],
    completedTodos: [],
    editTodo: { id: 0, content: '', description: '', date: '' },
  };
}

export default state;
