<template>
  <Login v-if="!isLoggedIn" />
  <section v-else class="todoapp">
    <div>
      <TodoHeader />
      <TodoList />
      <TodoFooter />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Login from './components/Login'
import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

import 'todomvc-app-css/index.css'

export default {
  components: {
    Login,
    TodoHeader,
    TodoList,
    TodoFooter
  },
  computed: mapState('auth', ['user', 'isLoggedIn']),
  methods: mapActions('auth', ['loginByGoogle', 'loginByTwitter', 'logout'])
}
</script>

<style lang="scss">
.btn {
  cursor: pointer;
  margin: 1em 0;
  font-size: 2em;
}
.user-info {
  font-size: 2em;
  line-height: 3em;

  & > img {
    border-radius: 50%;
    height: 2em;
    margin: 1em;
    vertical-align: middle;
    width: 2em;
  }

  & > .btn {
    margin: 0 1em;
    font-size: 0.5em;
  }
}
</style>
