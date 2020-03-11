import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import LoginPage from '@/homepage/login'
import Bus from '@/bus'
Vue.use(Bus)
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      component: LoginPage
    },
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
        show: true,
        requireAuth: true // 需要登录权限
      }
    }
  ]

})

router.beforeEach((to, from, next) => {
  // 发起的路由包含权限验证属性
  if (to.matched.some(res => res.meta.requireAuth)) {
    if (localStorage.getItem('userId')) {
      // 能查询到登录信息
      next()
    } else {
      next({
        path: '/'
        // query: {redirect: to.fullPath}
      })
      // Bus.$emit('unLogin', '没有检测到您的登录信息，此次访问已被拦截。请重新登录。')
    }
  } else { next() }
})

router.afterEach((to, from) => {
  if (to.path === '/') {
    // _this.$notify({
    //   title: '非法访问',
    //   $message: '没有检测到您的登录信息，此次访问已被拦截。请重新登录。'
    // })
    // console.log('to======login')
    // Bus.$emit('unLogin')
    // alert('没有检测到您的登录信息，此次访问已被拦截。请重新登录。')
  }
})

// 暴露路由（公开路由）
export default router
