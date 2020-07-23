/* eslint-disable no-undef */
// ---------------因为插件全部采用cdn，不import以达到减小体积的效果，避免语法检查报错
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import 'babel-polyfill'
Vue.use(gsap)
Vue.use(VCharts)
// Vue.use('v-charts')
Vue.config.productionTip = false
// Vue.use(ElementUI)
Vue.use(ELEMENT)
Vue.use(axios)
axios.defaults.timeout = 10000
// 配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.baseURL = 'http://localhost:6868/brps_war'// 配置接口地址 -开发
axios.defaults.baseURL = 'https://bp.chenlx.top:6868/brps_war'// 配置接口地址 -生产环境
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
