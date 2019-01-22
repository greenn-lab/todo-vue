<template>
  <section class="todoapp">
    <header>
      <h1>todo</h1>
      <input
          v-model="newTodo"
          @keyup.enter="add"
          class="new-todo"
          autofocus>
    </header>

    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all" title="Mark all as complete"></label>
      <ul class="todo-list">
        <li
            v-for="(todo, index) in todos"
            :key="index"
            :class="{completed: todo.completed, editing: editing === index}"
            @dblclick="edit(index)"
        >
          <div class="view">
            <input class="toggle" type="checkbox" @change="complete($event, index)">
            <label>{{todo.text}}</label>
            <button class="destroy" @click="remove(index)"></button>
          </div>
          <input
              v-model="todo.text"
              @keyup.enter="edit(index, true)"
              class="edit">
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

export default {
  name: 'app',
  methods: {
    add() {
      if (this.newTodo) {
        this.todos.push({
          text: this.newTodo,
          completed: false
        })

        this.newTodo = ''
      }
    },
    edit(index, finish) {
      if (!finish) this.editing = index
      else this.editing = -1
    },
    remove(index) {
      this.todos.splice(index, 1)
    },
    complete(e, index) {
      this.todos[index].completed = e.target.checked
    }
  },
  data() {
    return {
      todos: [],
      newTodo: '',
      editing: -1
    }
  }
}
</script>
