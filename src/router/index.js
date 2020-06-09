import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import LoginPage from '@/homepage/login'
import Bus from '@/bus'
Vue.use(Bus)
Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '*',
    //   component: LoginPage
    // },
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/login_m',
      name: 'LoginPageMobile',
      component: () => import('@/homepage/login_Mobile')
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: (resolve) => require(['@/brpsPage/personalCenter'], resolve),
      meta: {
        title: '个人中心',
        show: true,
        requireAuth: true // 需要登录权限
      }
    },
    {
      path: '/personalCenter_m',
      name: 'personalCenter_m',
      component: (resolve) => require(['@/brpsPage/personalCenter_Mobile'], resolve),
      meta: {
        title: '个人中心',
        show: true,
        requireAuth: true // 需要登录权限
      }
    },
    // {
    //   path: '/articleList',
    //   name: 'articleList',
    //   component: () => import('@/Article/articleList'),
    //   meta: {
    //     title: '文章列表',
    //     show: true
    //   }
    // },
    // {
    //   path: '/addNewArticle',
    //   name: 'addNewArticle',
    //   component: () => import('@/Article/addNewArticle'),
    //   meta: {
    //     title: '发布新文章',
    //     show: true
    //   }
    // },
    {
      path: '/wmList',
      name: 'wmList',
      component: () => import('@/Article/wmList'),
      meta: {
        title: 'lx接单情况表',
        show: true
      }
    },
    // {
    //   path: '/articleDetail',
    //   name: 'articleDetail',
    //   component: (resolve) => require(['@/Article/articleDetail'], resolve),
    //   meta: {
    //     title: '管理页面',
    //     show: true
    //   }
    // },
    {
      path: '/adminCenter',
      name: 'adminCenter',
      component: (resolve) => require(['@/AdminCenter/personalIndex'], resolve),
      meta: {
        title: '管理',
        show: true
      },
      children: [
        {
          path: '/adminCenter/welcome',
          name: 'welcome',
          component: () => import('@/AdminCenter/Right/defaultPage'),
          meta: {
            title: '管理中心', show: true
          }
        }
        // {
        //   path: '/adminCenter/addNewArticle',
        //   name: 'addNewArticle',
        //   component: (resolve) => require(['@/Article/addNewArticle'], resolve),
        //   meta: {
        //     title: '发布新文章',
        //     show: true
        //   }
        // },
        // {
        //   path: '/adminCenter/articleManage',
        //   name: 'articleManage',
        //   component: (resolve) => require(['@/sysManage/nav/articleList'], resolve),
        //   meta: {
        //     title: '文章管理',
        //     show: true
        //   }
        // }
      ]
    },
    {
      path: '/sbsubConan',
      name: 'sbsubConan',
      component: (resolve) => require(['@/other/conan/getDownloadLink'], resolve),
      meta: {
        title: '银弹柯南公告获取',
        show: true,
        requireAuth: true // 需要登录权限
      }
    }
  ]

})

function isMobile () {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag
}

router.beforeEach((to, from, next) => {
  // 发起的路由包含权限验证属性
  console.log('beforEach')
  if (to.meta.title) {
    document.title = to.meta.title + ' - BRPS个人记账网'
  }
  if (to.name === '/' || to.name === 'LoginPageMobile' || to.name === 'LoginPage') {
    // 如果前往地址是登录界面直接放行
    // 检查是否适配，不适配的话，需要更改地址
    if (isMobile() === null && to.name === 'LoginPageMobile') {
      next({ name: 'LoginPage' })
    } else if (isMobile() !== null && to.name === 'LoginPage') {
      next({ name: 'LoginPageMobile' })
    } else {
      next()
    }
  } else {
    // 验证前往地址是否需要权限
    if (to.matched.some(res => res.meta.requireAuth)) {
      // 需要权限
      if (localStorage.getItem('userId')) {
        // 拥有权限
        next()
      } else {
        // 没有权限赶回首页
        // 验证用户用手机还是电脑
        console.log(isMobile())
        if (isMobile() !== null) {
          // 手机拥有标识
          next({name: 'LoginPageMobile'})
        } else {
          // 赶回PC
          next({name: 'LoginPage'})
        }
      }
    } else {
      // 不需要权限
      next()
    }
  }

  // if (to) {
  //   if (to.matched.some(res => res.meta.requireAuth)) {
  //     if (localStorage.getItem('userId')) {
  //     // 能查询到登录信息

  //       next()
  //     } else {
  //     // to.name = 'LoginPage'
  //       next('LoginPage')
  //     // Bus.$emit('unLogin', '没有检测到您的登录信息，此次访问已被拦截。请重新登录。')
  //     }
  //   } else {
  //     // } else { next() }
  //     if (to.name === '/' || to.name === 'LoginPageMobile' || to.name === 'LoginPage') {
  //       if (isMobile() !== null) {
  //         next('LoginPageMobile')
  //       } else {
  //         next()
  //       }
  //     } else { next() }
  // }
  // }
})

router.afterEach((to, from) => {
  // if (to.path === '/') {
  //   // _this.$notify({
  //   //   title: '非法访问',
  //   //   $message: '没有检测到您的登录信息，此次访问已被拦截。请重新登录。'
  //   // })
  //   // console.log('to======login')
  //   // Bus.$emit('unLogin')
  //   // alert('没有检测到您的登录信息，此次访问已被拦截。请重新登录。')
  // }
})

// 暴露路由（公开路由）
export default router
