<template>
  <div v-if="!isLoggedIn">
    <button @click="loginByGoogle()">Sign in by Google</button>
    <button @click="loginByTwitter()">Sign in by Twitter</button>
  </div>
  <section v-else class="todoapp">
    <div>
      <label for="new-todo" class="user-info">
        <img :src="user.image">
        <span>{{user.name}}</span>
        <button @click="logout()">Logout</button>
      </label>

      <header>
        <h1>todo</h1>
        <input type="text" id="new-todo" class="new-todo" />
      </header>

      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all" title="Mark all as complete"></label>
        <ul class="todo-list">
          <li class="todo">
            <!-- class in "completed", "editing" -->
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>할일을 적어봐요.</label>
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
import { mapState, mapActions } from 'vuex'
import 'todomvc-app-css/index.css'

export default {
  name: 'todo-app',
  computed: {
    ...mapState('auth', ['user', 'isLoggedIn'])
  },
  methods: {
    ...mapActions('auth', ['loginByGoogle', 'loginByTwitter', 'logout'])
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
