<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all" title="Mark all as complete"></label>
    <ul class="todo-list">
      <todo-item
          v-for="(todo, index) in filtered(todos)"
          :key="index"
          :index="index"
          :todo="todo"
          @remove="remove"
          @complete="complete"
      />
    </ul>
  </section>
</template>

<script>
  import TodoItem from "./TodoItem";

  export default {
    name: 'TodoList',
    components: {TodoItem},
    props: ['todos', 'filter'],
    methods: {
      filtered(val) {
        return val.filter(i => {
          return this.filter == null || i.completed === this.filter
        })
      },
      editReady(index) {
        this.$parent.editReady(index)
      },
      editSave(index) {
        this.$parent.editSave(index)
      },
      remove(index) {
        this.$emit('remove', index)
      },
      complete(index, checked) {
        this.$emit('complete', index, checked)
      }
    }
  }
</script>
