<template>
  <section class="todoapp">
    <header>
      <h1>todo</h1>
      <input
          v-model="newTodo"
          @keyup.enter="add"
          class="new-todo"
          autofocus
      >
    </header>

    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all" title="Mark all as complete"></label>
      <ul class="todo-list">
        <li
            v-for="(todo, index) in filtered(todos)"
            :key="index"
            :class="{completed: todo.completed, editing: editing === index}"
            @dblclick="edit(index)"
        >
          <div class="view">
            <input class="toggle" type="checkbox" :checked="todo.completed" @change="complete($event, index)">
            <label>{{todo.text}}</label>
            <button class="destroy" @click="remove(index)"></button>
          </div>
          <input
              v-model="todo.text"
              @keyup.enter="edit(index, true)"
              class="edit"
          >
        </li>
      </ul>
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ output() }}</strong> left
      </span>
      <ul class="filters">
        <li>
          <a :class="{selected: !filter}" @click="filtering(null)">All</a>
        </li>
        <li>
          <a :class="{selected: filter === false}" @click="filtering(false)">Active</a>
        </li>
        <li>
          <a :class="{selected: filter === true}" @click="filtering(true)">Completed</a>
        </li>
      </ul>
      <button class="clear-completed" @click="clearCompleted">Clear completed</button>
    </footer>
  </section>
</template>

<script>
import 'todomvc-app-css/index.css'

export const STORAGE_KEY = 'todoapp-storage-key'

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
      else {
        this.editing = -1
        this.persist()
      }
    },
    remove(index) {
      this.todos.splice(index, 1)
    },
    complete(e, index) {
      this.todos[index].completed = e.target.checked
      this.persist()
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    clearCompleted() {
      this.todos = this.todos.filter(i => !i.completed)
    },
    filtering(filter) {
      this.filter = filter
    },
    filtered(val) {
      return val.filter(i => {
        return this.filter === null || i.completed === this.filter
      })
    },
    output() {
      const count = this.todos.filter(i => !i.completed).length
      return `${count} item${count > 1 ? 's' : ''}`
    }
  },
  data() {
    return {
      todos: [],
      newTodo: '',
      editing: -1,
      filter: null
    }
  },
  watch: {
    todos() {
      this.persist()
    }
  },
  created() {
    if (localStorage.hasOwnProperty(STORAGE_KEY))
      this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY))
  }
}
</script>
