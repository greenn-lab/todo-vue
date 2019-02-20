import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'

import auth from './auth'
import { db, utils } from '../firebase'

Vue.use(Vuex)

const collections = {
  todo: db.collection('/todos')
}

const checkAccessable = todo => {
  if (todo.user_id != auth.state.user.id) {
    alert('This is not yours. check your account!')
    return false
  }

  return true
}

const store = new Vuex.Store({
  state: {
    todos: [],
    filter: 'ALL'
  },
  mutations: {
    ...firebaseMutations,
    setFilter(state, filter) {
      state.filter = filter
    }
  },
  getters: {
    todos: ({ todos, filter }) =>
      filter === 'ALL' ? todos : todos.filter(i => i.status === filter),
    todosCount: (_, getters) => getters.todos.length,
    filter: ({ filter }) => filter
  },
  actions: {
    initTodo: firebaseAction(({ bindFirebaseRef }, ref) =>
      bindFirebaseRef('todos', ref)
    ),
    setFilter({ commit }, filter) {
      commit('setFilter', filter)
    },
    async setTodo(_, todo) {
      if (!todo.id) {
        Object.assign(todo, {
          id: utils.generateUUID(),
          status: 'ACTIVE',
          created: utils.getServerTimestamp(),
          user_id: auth.state.user.id
        })
      }

      await collections.todo.doc(todo.id).set(todo)
    },
    async removeTodo(_, todo) {
      if (checkAccessable(todo)) {
        await collections.todo
          .doc(todo.id)
          .delete()
          .catch(err => alert(err.message))
      }
    },
    changeStatus({ dispatch }, todo) {
      if (checkAccessable(todo)) {
        dispatch('setTodo', {
          ...todo,
          status: todo.status === 'COMPLETED' ? 'ACTIVE' : 'COMPLETED'
        })
      }
    },
    removeClearTodos({ state, dispatch }) {
      state.todos
        .filter(i => i.status === 'COMPLETED')
        .forEach(i => dispatch('removeTodo', i))
    }
  },
  modules: {
    auth
  }
})

store.dispatch('initTodo', collections.todo.orderBy('created', 'desc'))

export default store
