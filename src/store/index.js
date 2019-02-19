import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'

import auth from './auth'
import { db } from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: firebaseMutations,
  getters: {
    todos: state => state.todos
  },
  actions: {
    initTodo: firebaseAction(({ bindFirebaseRef }, ref) =>
      bindFirebaseRef('todos', ref)
    ),
    setTodo(_, text) {
      const id = uuid()
      const todo = {
        id,
        text,
        status: 'ACTIVE',
        created: firebase.firestore.FieldValue.serverTimestamp()
      }

      console.log(todo)

      db.collection('/todos')
        .doc(todo.id)
        .set(todo)
    }
  },
  modules: {
    auth
  }
})

export const uuid = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)

  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}
