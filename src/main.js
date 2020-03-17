// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import VueCookies from 'vue-cookies'
import 'babel-polyfill'
// import VConsole from 'vconsole'
// const vC = new VConsole()
// Vue.use(vC)
Vue.use(VueCookies)
Vue.use(VCharts)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(axios)
axios.defaults.timeout = 5000
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://119.3.20.59:6868/brps_war'// 配置接口地址
axios.defaults.withCredentials = true
// 可以通过这种方式给axios设置的默认请求头
// axios.defaults.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// }
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
