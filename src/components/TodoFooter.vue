<template>
  <footer class="footer">
      <span class="todo-count">
        <strong>{{ output() }}</strong> left
      </span>
    <ul class="filters">
      <li>
        <a :class="{selected: filter == null}" @click="$emit('filtering', null)">All</a>
      </li>
      <li>
        <a :class="{selected: filter === false}" @click="$emit('filtering', false)">Active</a>
      </li>
      <li>
        <a :class="{selected: filter === true}" @click="$emit('filtering', true)">Completed</a>
      </li>
    </ul>
    <button class="clear-completed" @click="clearCompleted">Clear completed</button>
  </footer>
</template>

<script>
  export default {
    name: 'TodoFooter',
    props: ['todos', 'filter'],
    methods: {
      clearCompleted() {
        this.todos = this.todos.filter(i => !i.completed)
      },
      output() {
        const count = this.todos.filter(i => !i.completed).length
        return `${count} item${count > 1 ? 's' : ''}`
      }
    }
  }
</script>
