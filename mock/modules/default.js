/* eslint-disable @typescript-eslint/no-var-requires */
const { resultError, resultSuccess, getRequestToken,
  setDummyTodo,
  removeTodos,
  addTodos,
  updateTodos,
  setComplete,
  getComplete,
  getDummyTodos } = require('../_util')

function createFakeUserList() {
  return [
    {
      userId: '1',
      email: 'test@abc.com',
      realName: '123456',
      password: '123456',
      token: 'fakeToken1',
    },
    {
      userId: '2',
      email: 'test2',
      password: '123456',
      token: 'fakeToken2',
    },
  ]
}

module.exports = [
  // mock user login
  {
    url: '/mock-api/tokens',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { email, password } = body
      const checkUser = createFakeUserList().find((item) => item.email === email && password === item.password)
      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }
      const { userId, email: _email, token } = checkUser
      try {
        setDummyTodo(userId)
      } catch (e) {
        localStorage.setItem('server-error.json', JSON.stringify(e))

      }

      return resultSuccess({
        userId,
        email: _email,
        token,
      })
    },
  },
  {
    url: '/mock-api/user/info',
    method: 'get',
    response: (request) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!')
      }
      //send user details with todo tasks

      return resultSuccess(checkUser)
    },
  },
  {
    url: '/mock-api/logout',
    timeout: 200,
    method: 'get',
    response: (request) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' })
    },
  },
  {
    url: '/mock-api/tasks',
    timeout: 200,
    method: 'get',
    response: (request) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }
      return resultSuccess(getDummyTodos(checkUser.userId));
    },
  },
  {
    url: '/mock-api/tasks/',
    timeout: 200,
    method: 'put',
    response: (request) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }
      //Update Records
      if (request.query.id) {
        setComplete(request.query.id, checkUser.userId)
      } else {
        updateTodos(checkUser.userId, request.body)
      }

      return resultSuccess(undefined, { message: 'Saved' })
    },
  },
  {
    url: '/mock-api/tasks/complete',
    timeout: 200,
    method: 'get',
    response: (request) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }

      return resultSuccess(getComplete(checkUser.userId), { message: 'completed tasks' })
    },
  },
  {
    url: '/mock-api/tasks/',
    timeout: 200,
    method: 'delete',
    response: (request) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }

      return resultSuccess(removeTodos(checkUser.userId, request.query.id), { message: 'remove tasks' })
    }
  },
  {
    url: '/mock-api/tasks',
    timeout: 200,
    method: 'post',
    response: (request) => {
      //localStorage.setItem('request_data.json',JSON.stringify(request));

      const { description, date, summery } = request.body;
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }
      //localStorage.setItem('request_data.json',JSON.stringify(request));
      const newId = addTodos(checkUser.userId, { summery: summery, description: description, date: date })
      return resultSuccess(newId, {
        message: 'added successfully'
      })
    },
  }

]
