import firebase from '../firebase'

const state = {
  user: null,
  isLoggedIn: false
}

const mutations = {
  setUser(state, payload) {
    state.user = payload
    state.isLoggedIn = !!payload
  }
}

const actions = {
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
