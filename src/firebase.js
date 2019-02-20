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

export default firebase
export const auth = firebase.auth()
export const db = firebase.firestore()

export const utils = {
  getServerTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp()
  },
  generateUUID() {
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
}
