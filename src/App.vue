<template>
  <div v-if="!isLoggedIn">
    <button @click="loginByGoogle()">Sign in by Google</button>
    <button @click="loginByTwitter()">Sign in by Twitter</button>
  </div>
  <section v-else class="todoapp">
    <div>
      <div class="user-info">
        <img :src="user.image" />
        <span>{{ user.name }}</span>
        <button @click="logout()">Logout</button>
      </div>

      <header>
        <h1>todo</h1>
        <input
          type="text"
          class="new-todo"
          v-model="text"
          @keypress.enter="save()"
        />
      </header>

      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all" title="Mark all as complete"></label>
        <ul class="todo-list">
          <li v-for="todo in todos" :key="todo.id" class="todo">
            <!-- class in "completed", "editing" -->
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>{{ todo.text }}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li>
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count"> <strong>1 item</strong> left </span>
        <ul class="filters">
          <li>
            <a href="#/all" class="selected">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
            <!-- class in "selected" -->
          </li>
          <li>
            <a href="#/completed">Completed</a>
            <!-- class in "selected" -->
          </li>
        </ul>
        <button class="clear-completed">Clear completed</button>
      </footer>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { db } from './firebase'

import 'todomvc-app-css/index.css'

export default {
  name: 'todo-app',
  data() {
    return {
      text: ''
    }
  },
  computed: {
    ...mapGetters(['todos']),
    ...mapState('auth', ['user', 'isLoggedIn'])
  },
  methods: {
    ...mapActions('auth', ['loginByGoogle', 'loginByTwitter', 'logout']),
    save() {
      this.$store.dispatch('setTodo', this.text)
    }
  },
  created() {
    this.$store.dispatch('initTodo', db.collection('/todos').orderBy('created'))
  }
}
</script>

<style lang="scss">
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

  & > button {
    float: right;
    margin: 1em;
  }
}
</style>
