<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  created() {
    this.interceptorRequest()
    this.interceptorResponse()
  },
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  }
}
</script>
<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
