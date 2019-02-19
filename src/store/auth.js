import firebase from '../firebase'
import store from './index'

firebase.auth().onAuthStateChanged(user => {
  const userInfo = {}

  if (user) {
    Object.assign(userInfo, {
      id: user.uid,
      name: user.displayName,
      image: user.photoURL,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  store.commit('auth/setUser', userInfo)
})

export default {
  namespaced: true,
  state: {
    user: null,
    isLoggedIn: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      state.isLoggedIn = !!user.id
    }
  },
  actions: {
    async loginByGoogle() {
      const googleProvider = new firebase.auth.GoogleAuthProvider()
      await firebase
        .auth()
        .signInWithPopup(googleProvider)
        .catch(err => console.log(err))
    },
    async loginByTwitter() {
      await firebase
        .auth()
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
    },
    logout() {
      firebase.auth().signOut()
    }
  }
}
