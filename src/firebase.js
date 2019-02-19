import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyDFyfRsnd9WRxowhYTKLWQVmexIRSHNhL0',
  authDomain: 'todo-lunch.firebaseapp.com',
  databaseURL: 'https://todo-lunch.firebaseio.com',
  projectId: 'todo-lunch',
  storageBucket: 'todo-lunch.appspot.com',
  messagingSenderId: '782746313643'
})

export const db = firebase.firestore()

export default firebase
