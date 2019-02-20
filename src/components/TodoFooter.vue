<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{ todosCount }} item{{ todosCount > 1 ? 's' : '' }}</strong>
      left
    </span>
    <ul class="filters">
      <li>
        <a
          href="#/all"
          @click="setFilter('ALL')"
          :class="{ selected: filter === 'ALL' }"
          >All</a
        >
      </li>
      <li>
        <a
          href="#/active"
          @click="setFilter('ACTIVE')"
          :class="{ selected: filter === 'ACTIVE' }"
          >Active</a
        >
      </li>
      <li>
        <a
          href="#/completed"
          @click="setFilter('COMPLETED')"
          :class="{ selected: filter === 'COMPLETED' }"
          >Completed</a
        >
      </li>
    </ul>
    <button class="clear-completed" @click="removeClearTodos()">
      Clear completed
    </button>
  </footer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['filter', 'todosCount']),
  methods: {
    ...mapActions(['removeClearTodos']),
    setFilter(filter) {
      this.$store.dispatch('setFilter', filter)
    }
  }
}
</script>
