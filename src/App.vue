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
  methods: {
    isMobile () {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    }
  },
  mounted () {
    let _this = this
    if (_this.isMobile()) {
      // alert('手机端')
      this.$router.push({path: 'login_m'})
    } else {
      // alert('pc端')
      this.$router.replace({path: '/'})
    }
  }
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
