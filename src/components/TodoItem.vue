<template>
  <li
      :class="{completed: todo.completed, editing: todo.editing}"
      @dblclick="editReady(index)"
  >
    <div class="view">
      <input class="toggle" type="checkbox" :checked="todo.completed" @change="complete($event, index)">
      <label>{{todo.text}}</label>
      <button class="destroy" @click="remove(index)"></button>
    </div>
    <input
        v-model="todo.text"
        @keyup.enter="editSave(index)"
        @blur="editSave(index)"
        class="edit"
    >
  </li>

</template>

<script>
  export default {
    name: 'TodoItem',
    props: ['todo', 'index'],
    methods: {
      editReady(index) {
        this.$parent.editReady(index)
      },
      editSave(index) {
        console.log(this.todo)
        this.$parent.editSave(index)
      },
      remove(index) {
        this.$emit('remove', index)
      },
      complete(e, index) {
        this.$emit('complete', index, e.target.checked)
      }
    },
    watch: {
      todo() {
        console.log('watching todo in TodoItem')
      }
    }
  }
</script>
