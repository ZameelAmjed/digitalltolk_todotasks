if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


//:todo use json for datastores
/**
 * fill it with dummy if all empty
 */
function getDummyTodos(userId) {
  try {
    const str = localStorage.getItem(userFilename('todos', userId));
    return str;
  } catch (e) {
    return '';
  }

}

function setDummyTodo(userId) {
  const todos = [
    {
      id: 1,
      content: 'Submit My Resume',
      description: 'submit soon',
      date: '2022-03-23 23:30:00'
    },
    {
      id: 2,
      content: 'Complete the Task',
      description: 'work on it fast',
      date: '2022-03-23 23:30:00'
    },
    {
      id: 3,
      content: 'Buy a chocolate to Mom',
      description: 'Kandos chocolate',
      date: '2022-03-23 23:30:00'
    },
    {
      id: 4,
      content: 'Facetime with Dad',
      description: 'Ok face time',
      date: '2021-03-23 23:30:00'
    }];
  let newTodos = [];
  for (let i in todos) {
    const newId = incrementTodoId();
    newTodos.push({ id: newId, content: todos[i].content, description: todos[i].description, date: todos[i].date })
  }
  try {
    const oldTodos = localStorage.getItem(userFilename('todos', userId));
    if (oldTodos.length > 0) {
      //already he has data so dont add dummmy
      return;
    }
    localStorage.setItem(userFilename('todos', userId), JSON.stringify(newTodos));
  } catch (e) {
    localStorage.setItem('server-error.json', JSON.stringify(e))
    localStorage.setItem(userFilename('todos', userId), JSON.stringify(newTodos));
  }

}
/**
 * Remove Todos
 */
function removeTodos(userId, todoId) {

  let todos = '';
  try {
    todos = localStorage.getItem(userFilename('todos', userId));
  } catch (e) {
  }

  if (todos.length > 0) {
    todos = JSON.parse(todos);
    let newTodos = [];
    for (let i in todos) {
      if (todos[i].id != todoId) {
        newTodos.push(todos[i])
      }
    }

    localStorage.setItem(userFilename('todos', userId), JSON.stringify(newTodos));
  }

}

/**
 * Add Todos
 */
function addTodos(userId, addTodos) {
  let todos = '';
  try {
    todos = localStorage.getItem(userFilename('todos', userId));
  } catch (e) {
    localStorage.setItem('error', JSON.stringify(e));

  }

  if (todos.length > 0) {
    todos = JSON.parse(todos);
    let newTodos = [];
    newTodos = todos;
    const newId = incrementTodoId();
    newTodos.push({ id: newId, content: addTodos.summery, description: addTodos.description, date: addTodos.time })
    localStorage.setItem(userFilename('todos', userId), JSON.stringify(newTodos));
    return newId;
  }
}
/**
 * Update todos
 */
function updateTodos(userId, editedTodo) {
  let todos = '';
  try {
    todos = localStorage.getItem(userFilename('todos', userId));
  } catch (e) {
  }

  if (todos.length > 0) {
    todos = JSON.parse(todos);
    for (i in todos) {
      if (todos[i].id === editedTodo.id) {
        todos[i].content = editedTodo.summery;
        todos[i].description = editedTodo.description;
        todos[i].date = editedTodo.date;
      }
    }
    localStorage.setItem(userFilename('todos', userId), JSON.stringify(todos));
  }

}

//Set status update
function setComplete(id, userId) {
  try {
    id = parseInt(id);
    let todos = localStorage.getItem(userFilename('todos', userId));
    todos = JSON.parse(todos);
    let selectedTodo = [];
    let newTodo = [];
    try {
      const selectedTodoStr = localStorage.getItem(userFilename('ctodos', userId))
      selectedTodo = JSON.parse(selectedTodoStr);
    } catch (e) {
      localStorage.setItem('err.json', JSON.stringify(e))
    }
    localStorage.setItem('SET.json', JSON.stringify(todos))
    for (let i in todos) {
      if (todos[i].id === id) {
        selectedTodo.push(todos[i]);
      } else {
        newTodo.push(todos[i])
      }
    }
    localStorage.setItem('1.json', JSON.stringify(newTodo))
    localStorage.setItem('1.json', JSON.stringify(selectedTodo))

    localStorage.setItem(userFilename('todos', userId), JSON.stringify(newTodo));
    localStorage.setItem(userFilename('ctodos', userId), JSON.stringify(selectedTodo));

  } catch (e) {
    localStorage.setItem('err.json', JSON.stringify(e))
  }
}

//get completed tasks list
function getComplete(userId) {
  try {
    const str = localStorage.getItem(userFilename('ctodos', userId));
    return str;
  } catch (e) {
    return '';
  }

}

function resultSuccess(result, { message = 'ok' } = {}) {
  return {
    code: 0,
    result,
    message,
    type: 'success',
  }
}

function resultPageSuccess(page, pageSize, list, { message = 'ok' } = {}) {
  const pageData = pagination(page, pageSize, list)

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  }
}

function resultError(message = 'Request failed', { code = -1, result = null } = {}) {
  return {
    code,
    result,
    message,
    type: 'error',
  }
}

function pagination(pageNo, pageSize, array) {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize))
  return ret
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
function getRequestToken({ headers }) {
  return headers ? headers.authorization : ''
}
/**
 * Helper function 
 * @description get filename
 */
function userFilename(filename, userId) {
  if (filename == 'todos') {
    return 'todos-' + userId + '.json';
  } else if (filename == 'ctodos') {
    return 'completed-todos-' + userId + '.json';
  } else {
    return 'UNS';
  }

}
/**
 * helper function
 * @returns int
 */
function incrementTodoId() {
  let todo = 0;
  try {
    todo = parseInt(localStorage.getItem('todoId')) + 1;
  } catch (e) {
    //file missing so create a new one
    todo = 1;
  }
  localStorage.setItem('todoId', todo);
  return todo;
}

module.exports = {
  getRequestToken,
  pagination,
  resultError,
  resultPageSuccess,
  resultSuccess,
  setDummyTodo,
  removeTodos,
  addTodos,
  updateTodos,
  getDummyTodos,
  setComplete,
  getComplete
}
