<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all" title="Mark all as complete"></label>
    <ul class="todo-list">
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="{
          todo: true,
          completed: todo.status === 'COMPLETED'
        }"
      >
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            @click.prevent="changeStatus(todo)"
            :checked="todo.status === 'COMPLETED'"
          />
          <label>{{ todo.text }}</label>
          <button @click="removeTodo(todo)" class="destroy"></button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['todos']),
  methods: {
    ...mapActions(['removeTodo', 'changeStatus']),
  }
}
</script>
