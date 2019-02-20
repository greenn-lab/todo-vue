import firebase, { db, auth, utils } from '../firebase'
import store from './index'

auth.onAuthStateChanged(user => {
  const userInfo = {}

  if (user) {
    Object.assign(userInfo, {
      id: user.uid,
      name: user.displayName,
      image: user.photoURL,
      created: utils.getServerTimestamp()
    })

    db.collection('/users')
      .doc(userInfo.id)
      .set({
        ...userInfo,
        lastLoggedIn: utils.getServerTimestamp()
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
      await auth.signInWithPopup(googleProvider).catch(err => console.log(err))
    },
    async loginByTwitter() {
      await auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
    },
    logout() {
      auth.signOut()
    }
  }
}
