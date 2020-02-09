import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import LoginPage from '@/homepage/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: () => import('@/brpsPage/personalCenter'),
      meta: {
        title: '个人中心',
        show: true
      }
    }
  ]
})
