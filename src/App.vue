<template>
  <section class="todoapp">
    <header>
      <h1>todo</h1>
      <input type="text" class="new-todo" v-model="newTodo" @keyup.enter="add">
    </header>

    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all" title="Mark all as complete"></label>
      <ul class="todo-list">
        <li v-for="todo in todos" class="todo"> <!-- class in "completed", "editing" -->
          <div class="view">
            <input class="toggle" type="checkbox">
            <label>{{todo.text}}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" type="text">
        </li>
      </ul>
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>1 item</strong> left
      </span>
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
  </section>
</template>

<script>
import 'todomvc-app-css/index.css'

export const STATUS_ACTIVE = 'STATUS_ACTIVE'
export const STATUS_COMPLETED = 'STATUS_COMPLETED'

export default {
  name: 'app',
  methods: {
    add() {
      this.todos.push({
        text: this.newTodo,
        status: STATUS_ACTIVE
      })

      this.newTodo = ''
    }
  },
  data() {
    return {
      todos: [],
      newTodo: ''
    }
  }
}
</script>
