<template>
  <div>
    Sign in by
    <a @click="loginByGoogle()" class="btn">Google</a>,
    <a @click="loginByTwitter()" class="btn">Twitter</a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: mapActions('auth', ['loginByGoogle', 'loginByTwitter'])
}
</script>
