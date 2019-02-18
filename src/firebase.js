import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import store from './store'

firebase.initializeApp({
  apiKey: 'AIzaSyDFyfRsnd9WRxowhYTKLWQVmexIRSHNhL0',
  authDomain: 'todo-lunch.firebaseapp.com',
  databaseURL: 'https://todo-lunch.firebaseio.com',
  projectId: 'todo-lunch',
  storageBucket: 'todo-lunch.appspot.com',
  messagingSenderId: '782746313643'
})

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userInfo = {
      id: user.uid,
      name: user.displayName,
      image: user.photoURL,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    }

    store.commit('auth/setUser', userInfo)
  }
})

export const db = firebase.firestore()

export default firebase
