import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import LoginPage from '@/homepage/login'

Vue.use(Router)

export default  new Router({
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
        title: '????',
        show: true
      }
    }
  ]
})

// default.beforeEach((to, from, next) => {
//   /* ??????????title */
//   if (to.meta.title) {
//     document.title = to.meta.title + " - ????"
//   }
//   next()
// })
