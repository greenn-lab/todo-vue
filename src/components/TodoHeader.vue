<template>
  <section>
    <div class="user-info">
      <img :src="user.image" />
      <span>{{ user.name }}</span>
      <a @click="logout()" class="btn">Logout</a>
    </div>

    <header>
      <h1>todo</h1>
      <input
        type="text"
        class="new-todo"
        v-model="text"
        @keypress.enter="save()"
      />
    </header>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      text: ''
    }
  },
  computed: mapState('auth', ['user']),
  methods: {
    ...mapActions('auth', ['logout']),
    save() {
      this.$store.dispatch('setTodo', { text: this.text })
        .then(() => this.text = '')
    }
  }
}
</script>
