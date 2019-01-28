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

    <todo-list
        :todos="todos"
        :filter="filter"
        @remove="remove"
        @complete="complete"
    />

    <todo-footer
        :todos="todos"
        :filter="filter"
        @filtering="filtering"
    />
  </section>
</template>

<script>
  import TodoList from './components/TodoList'
  import TodoFooter from './components/TodoFooter'

  import 'todomvc-app-css/index.css'

  export const STORAGE_KEY = 'todoapp-storage-key'

export default {
  name: 'app',
  components: {
    TodoList,
    TodoFooter
  },
  methods: {
    add() {
      if (this.newTodo) {
        this.todos.push({
          text: this.newTodo,
          completed: false,
          editing: false
        })

        this.newTodo = ''
      }
    },
    editReady(index) {
      this.todos[index].editing = true
    },
    editSave(index) {
      this.todos[index].editing = false
    },
    remove(index) {
      this.todos.splice(index, 1)
    },
    complete(index, checked) {
      this.todos[index].completed = checked
    },
    filtering(filter) {
      this.filter = filter
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    todo() {
      console.log('dirty checking "todo"')
    }
  },
  created() {
    if (localStorage.hasOwnProperty(STORAGE_KEY))
      this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY))
  }
}
</script>
