<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <transition name="translate">
    <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
}
#app{
  height: 100vh;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
